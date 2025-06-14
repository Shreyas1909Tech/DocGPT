
from flask import Flask, request, jsonify, render_template
import os
import base64
import difflib
import urllib.parse
import html
import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from deep_translator import GoogleTranslator
from transformers import pipeline
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf', 'txt', 'json', 'xml', 'html', 'csv', 'md'}

# Pre-load the QA model with error handling
try:
    qa_model = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
except Exception as e:
    print(f"Error loading QA model: {e}")
    qa_model = None

# ===== Utility Functions =====

def allowed_file(filename):
    """Check if the uploaded file is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text = ""
    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
    return text

def summarize_text(text, num_sentences=5):
    """Summarize the given text using LSA summarizer."""
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, num_sentences)
    return " ".join(str(sentence) for sentence in summary)

def transcribe_audio(audio_file_path):
    """Transcribe audio using Google Speech Recognition."""
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file_path) as source:
            print("Extracting audio data...")
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data)
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

def read_file(file_path):
    """Read text from various file formats."""
    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    else:
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()
        except UnicodeDecodeError:
            # Try another encoding if utf-8 fails
            with open(file_path, "r", encoding="latin-1") as file:
                return file.read()
        except Exception as e:
            print(f"Error reading file: {e}")
            return None

def encode_base64(text):
    """Encode text to Base64."""
    try:
        encoded_bytes = base64.b64encode(text.encode('utf-8'))
        return encoded_bytes.decode('utf-8')
    except Exception as e:
        print(f"Error encoding to Base64: {e}")
        return None

def decode_base64(text):
    """Decode Base64 text."""
    try:
        decoded_bytes = base64.b64decode(text)
        return decoded_bytes.decode('utf-8')
    except Exception as e:
        print(f"Error decoding from Base64: {e}")
        return None

def encode_url(text):
    """Encode text for URL."""
    try:
        return urllib.parse.quote(text)
    except Exception as e:
        print(f"Error encoding URL: {e}")
        return None

def decode_url(text):
    """Decode URL encoded text."""
    try:
        return urllib.parse.unquote(text)
    except Exception as e:
        print(f"Error decoding URL: {e}")
        return None

def encode_html(text):
    """Encode text to HTML entities."""
    try:
        return html.escape(text)
    except Exception as e:
        print(f"Error encoding HTML: {e}")
        return None

def decode_html(text):
    """Decode HTML entities to text."""
    try:
        return html.unescape(text)
    except Exception as e:
        print(f"Error decoding HTML: {e}")
        return None

# Morse code dictionaries
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--', 
    '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', 
    ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', 
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
    '@': '.--.-.'
}

MORSE_CODE_REVERSE = {value: key for key, value in MORSE_CODE_DICT.items()}

def encode_morse(text):
    """Convert text to Morse code."""
    try:
        text = text.upper()
        morse = []
        for char in text:
            if char in MORSE_CODE_DICT:
                morse.append(MORSE_CODE_DICT[char])
            else:
                morse.append(char)  # Keep characters that aren't in the dictionary
        return ' '.join(morse)
    except Exception as e:
        print(f"Error encoding to Morse: {e}")
        return None

def decode_morse(morse_code):
    """Convert Morse code to text."""
    try:
        morse_code = morse_code.strip()
        words = morse_code.split(' / ')
        decoded_text = ''
        
        for word in words:
            chars = word.split(' ')
            for char in chars:
                if char in MORSE_CODE_REVERSE:
                    decoded_text += MORSE_CODE_REVERSE[char]
                elif char == '':
                    pass  # Skip empty strings
                else:
                    decoded_text += char  # Keep characters that aren't in the dictionary
            decoded_text += ' '
            
        return decoded_text.strip()
    except Exception as e:
        print(f"Error decoding from Morse: {e}")
        return None

# ===== Flask API Routes =====

@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to the DocGPT API with various utilities!",
        "endpoints": [
            "/comparefile - Compare two documents",
            "/qamodel - Ask questions about a document",
            "/summarize - Summarize a document",
            "/encode - Encode text using various methods",
            "/decode - Decode text using various methods",
            "/translate - Translate text to different languages"
        ]
    })

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handle file uploads for summarization."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part!"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected!"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        text = read_file(file_path)
        summary_length = int(request.form.get("summary_length", 5))
        summary = summarize_text(text, summary_length)

        os.remove(file_path)
        return jsonify({"summary": summary})

    return jsonify({"error": "Invalid file type!"}), 400

@app.route("/comparefile", methods=["POST"])
def compare_files():
    """Compare two uploaded files and return the differences."""
    file1 = request.files.get("file1")
    file2 = request.files.get("file2")

    if not file1 or not file2:
        return jsonify({"error": "Both files are required!"}), 400

    file1_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file1.filename))
    file2_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file2.filename))
    file1.save(file1_path)
    file2.save(file2_path)

    text1 = read_file(file1_path)
    text2 = read_file(file2_path)

    if text1 is None or text2 is None:
        return jsonify({"error": "Error reading one or both files!"}), 500

    # Find line-by-line differences
    diff = difflib.unified_diff(text1.splitlines(), text2.splitlines(), fromfile="File 1", tofile="File 2", lineterm="")
    comparison_result = "\n".join(diff)

    os.remove(file1_path)
    os.remove(file2_path)

    return jsonify({"comparison_result": comparison_result})

@app.route("/search_in_document_with_voice", methods=["POST"])
def search_in_document_with_voice():
    """Search for a keyword in the document based on audio transcription."""
    audio_file = request.files.get("audio_file")
    document_file = request.files.get("document_file")

    if not audio_file or not document_file:
        return jsonify({"error": "Both audio file and document file are required!"}), 400

    audio_file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(audio_file.filename))
    document_file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
    audio_file.save(audio_file_path)
    document_file.save(document_file_path)

    try:
        transcribed_keyword = transcribe_audio(audio_file_path)
        if not transcribed_keyword:
            return jsonify({"error": "Failed to transcribe audio!"}), 400

        document_text = read_file(document_file_path)
        if not document_text:
            return jsonify({"error": "Failed to read document!"}), 400

        # Check if the keyword is in the document
        search_result = "Keyword found in document." if transcribed_keyword.lower() in document_text.lower() else "Keyword not found in document."
        
        return jsonify({
            "transcribed_keyword": transcribed_keyword,
            "search_result": search_result
        })
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        # Clean up temporary files
        if os.path.exists(audio_file_path):
            os.remove(audio_file_path)
        if os.path.exists(document_file_path):
            os.remove(document_file_path)

@app.route("/qamodel", methods=["POST"])
def qa_model_endpoint():
    """Answer questions based on the provided context."""
    document_file = request.files.get("document_file")
    questions = request.form.getlist("questions[]")

    if not document_file or not questions:
        return jsonify({"error": "Document file and questions are required!"}), 400

    document_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
    document_file.save(document_path)

    try:
        context = read_file(document_path)
        if not context:
            return jsonify({"error": "Could not read the document!"}), 500

        if qa_model is None:
            return jsonify({"error": "QA model failed to initialize!"}), 500

        answers = []
        for q in questions:
            try:
                answer = qa_model(question=q, context=context)["answer"]
                answers.append({"question": q, "answer": answer})
            except Exception as e:
                answers.append({"question": q, "answer": f"Error processing this question: {str(e)}"})

        return jsonify({"answers": answers})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        if os.path.exists(document_path):
            os.remove(document_path)

@app.route("/summarize", methods=["POST"])
def summarize():
    """Summarize the text content of an uploaded document."""
    document_file = request.files.get("document_file")
    num_sentences = request.form.get("num_sentences", "5")
    
    if not document_file:
        return jsonify({"error": "Document file is required!"}), 400
    
    try:
        num_sentences = int(num_sentences)
    except ValueError:
        return jsonify({"error": "Number of sentences must be an integer!"}), 400
    
    document_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
    document_file.save(document_path)
    
    try:
        text = read_file(document_path)
        if not text:
            return jsonify({"error": "Could not read the document!"}), 500
        
        summary = summarize_text(text, num_sentences)
        return jsonify({"summary": summary})
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        if os.path.exists(document_path):
            os.remove(document_path)

@app.route("/encode", methods=["POST"])
def encode():
    """Encode text using the specified method."""
    # Check if file upload is provided
    if 'document_file' in request.files:
        document_file = request.files['document_file']
        method = request.form.get('method')
        
        if not document_file or not method:
            return jsonify({"error": "Document file and method are required!"}), 400
            
        document_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
        document_file.save(document_path)
        
        try:
            text = read_file(document_path)
            if not text:
                return jsonify({"error": "Could not read the document!"}), 500
            
            # Now encode the text from the file
            result = None
            if method == 'base64':
                result = encode_base64(text)
            elif method == 'url':
                result = encode_url(text)
            elif method == 'html':
                result = encode_html(text)
            elif method == 'morse':
                result = encode_morse(text)
            else:
                return jsonify({"error": f"Unsupported encoding method: {method}"}), 400
                
            if result is None:
                return jsonify({"error": "Encoding failed!"}), 500
                
            return jsonify({"result": result})
        finally:
            if os.path.exists(document_path):
                os.remove(document_path)
    
    # If no file, check for direct text input in JSON
    else:
        data = request.json
        if not data or 'text' not in data or 'method' not in data:
            return jsonify({"error": "Text and method are required!"}), 400
        
        text = data['text']
        method = data['method']
        
        if not text:
            return jsonify({"error": "Text cannot be empty!"}), 400
        
        result = None
        if method == 'base64':
            result = encode_base64(text)
        elif method == 'url':
            result = encode_url(text)
        elif method == 'html':
            result = encode_html(text)
        elif method == 'morse':
            result = encode_morse(text)
        else:
            return jsonify({"error": f"Unsupported encoding method: {method}"}), 400
        
        if result is None:
            return jsonify({"error": "Encoding failed!"}), 500
        
        return jsonify({"result": result})

@app.route("/decode", methods=["POST"])
def decode():
    """Decode text using the specified method."""
    # Check if file upload is provided
    if 'document_file' in request.files:
        document_file = request.files['document_file']
        method = request.form.get('method')
        
        if not document_file or not method:
            return jsonify({"error": "Document file and method are required!"}), 400
            
        document_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
        document_file.save(document_path)
        
        try:
            text = read_file(document_path)
            if not text:
                return jsonify({"error": "Could not read the document!"}), 500
            
            # Now decode the text from the file
            result = None
            if method == 'base64':
                result = decode_base64(text)
            elif method == 'url':
                result = decode_url(text)
            elif method == 'html':
                result = decode_html(text)
            elif method == 'morse':
                result = decode_morse(text)
            else:
                return jsonify({"error": f"Unsupported decoding method: {method}"}), 400
                
            if result is None:
                return jsonify({"error": "Decoding failed!"}), 500
                
            return jsonify({"result": result})
        finally:
            if os.path.exists(document_path):
                os.remove(document_path)
    
    # If no file, check for direct text input in JSON
    else:
        data = request.json
        if not data or 'text' not in data or 'method' not in data:
            return jsonify({"error": "Text and method are required!"}), 400
        
        text = data['text']
        method = data['method']
        
        if not text:
            return jsonify({"error": "Text cannot be empty!"}), 400
        
        result = None
        if method == 'base64':
            result = decode_base64(text)
        elif method == 'url':
            result = decode_url(text)
        elif method == 'html':
            result = decode_html(text)
        elif method == 'morse':
            result = decode_morse(text)
        else:
            return jsonify({"error": f"Unsupported decoding method: {method}"}), 400
        
        if result is None:
            return jsonify({"error": "Decoding failed!"}), 500
        
        return jsonify({"result": result})

@app.route("/translate", methods=["POST"])
def translate():
    """Translate text to the specified language."""
    # Check if file upload is provided
    if 'document_file' in request.files:
        document_file = request.files['document_file']
        target_lang = request.form.get('target_lang')
        
        if not document_file or not target_lang:
            return jsonify({"error": "Document file and target language are required!"}), 400
            
        document_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(document_file.filename))
        document_file.save(document_path)
        
        try:
            text = read_file(document_path)
            if not text:
                return jsonify({"error": "Could not read the document!"}), 500
            
            # Now translate the text from the file
            try:
                translator = GoogleTranslator(source='auto', target=target_lang)
                translated_text = translator.translate(text)
                
                if not translated_text:
                    return jsonify({"error": "Translation failed!"}), 500
                
                return jsonify({"translated_text": translated_text})
            except Exception as e:
                return jsonify({"error": f"Translation error: {str(e)}"}), 500
                
        finally:
            if os.path.exists(document_path):
                os.remove(document_path)
    
    # If no file, check for direct text input in JSON
    else:
        data = request.json
        if not data or 'text' not in data or 'target_lang' not in data:
            return jsonify({"error": "Text and target language are required!"}), 400
        
        text = data['text']
        target_lang = data['target_lang']
        
        if not text:
            return jsonify({"error": "Text cannot be empty!"}), 400
        
        try:
            translator = GoogleTranslator(source='auto', target=target_lang)
            translated_text = translator.translate(text)
            
            if not translated_text:
                return jsonify({"error": "Translation failed!"}), 500
            
            return jsonify({"translated_text": translated_text})
        
        except Exception as e:
            return jsonify({"error": f"Translation error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
