# DocGPT - Document AI Analysis System

A powerful document analysis and processing tool with a React frontend and Flask backend. DocGPT provides AI-powered features for document processing including comparison, voice search, Q&A, summarization, encoding/decoding, and translation.

## ✨ Features

- 📄 **Document Comparison** - Compare two documents and see detailed line-by-line differences
- 🎤 **Voice Search** - Search documents using audio transcription
- ❓ **Q&A Model** - Ask questions about document content and get AI-powered answers
- 📝 **Summarization** - Generate concise summaries of documents
- 🔐 **Encoding** - Encode text with Base64, URL, HTML, and Morse code
- 🔓 **Decoding** - Decode text from various formats
- 🌍 **Translation** - Translate documents to 12+ languages

## 🚀 Quick Start

### Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup (Flask)

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python app.py
```

The server will run on `http://localhost:5000`

### Frontend Setup (React)

1. Install Node.js dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Supported File Formats

- PDF
- TXT
- JSON
- XML
- HTML
- CSV
- Markdown (MD)

## 🛠️ Project Structure

```
DocGPT/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── lib/             # Utility functions and API client
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── app.py               # Flask backend
├── requirements.txt     # Python dependencies
├── package.json         # Node.js dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Document Processing

- `POST /comparefile` - Compare two documents
- `POST /summarize` - Summarize a document
- `POST /qamodel` - Q&A based on document content
- `POST /search_in_document_with_voice` - Search using voice transcription

### Text Processing

- `POST /encode` - Encode text (base64, url, html, morse)
- `POST /decode` - Decode text (base64, url, html, morse)
- `POST /translate` - Translate text to different languages

## 🎯 Usage Examples

### Document Comparison
1. Go to the "Compare" section
2. Upload two documents
3. Click "Compare Documents"
4. View the detailed differences

### Q&A Model
1. Go to the "Q&A" section
2. Upload a document
3. Enter your questions
4. Click "Get Answers"
5. View AI-powered responses

### Summarization
1. Go to the "Summarize" section
2. Upload a document
3. Adjust the number of sentences
4. Click "Summarize Document"

### Voice Search
1. Go to the "Voice Search" section
2. Upload a document
3. Upload an audio file with a search keyword
4. Click "Search"
5. View transcription and search results

### Text Encoding/Decoding
1. Go to "Encode" or "Decode"
2. Select the encoding method
3. Enter text to process
4. Click the button
5. Copy the result

### Translation
1. Go to "Translate"
2. Select target language
3. Enter text
4. Click "Translate"
5. Copy the translated text

## 🔧 Configuration

Create a `.env` file in the root directory:

```
VITE_API_BASE=http://localhost:5000
```

## 📦 Dependencies

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Sonner (Toast notifications)
- Lucide React (Icons)

### Backend
- Flask
- Flask-CORS
- PyPDF2
- Transformers
- PyTorch
- SpeechRecognition
- Deep Translator
- Sumy

## 🐛 Troubleshooting

### Backend connection issues
- Ensure Flask is running on `http://localhost:5000`
- Check CORS is enabled in `app.py`
- Verify firewall settings

### Model loading errors
- First run may take time to download transformers models
- Ensure sufficient disk space and internet connection
- Check PyTorch installation

### Audio transcription not working
- Ensure audio file is in supported format (WAV, FLAC, etc.)
- Check microphone permissions if using system audio
- Verify internet connection for Google Speech Recognition

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

[Shreyas1909Tech](https://github.com/Shreyas1909Tech)

## 🙏 Acknowledgments

- Flask and React communities
- Hugging Face Transformers
- Google Translate API
- All open-source contributors

---

**Happy Documenting! 🎉**
