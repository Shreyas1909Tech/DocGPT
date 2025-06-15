
# Document Analysis System

This project is a Document Analysis System with a React frontend and Flask backend. It provides several features for document processing:

- Document Comparison
- Voice Search in Documents
- Q&A Model for Documents
- Document Summarization

## Setup Instructions

### Backend (Flask)

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the Flask server:
   ```
   python app.py
   ```
   The server will run on http://localhost:5000 by default.

### Frontend (React)

1. Install Node.js dependencies:
   ```
   npm install
   ```

2. Run the React development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173.

## Using the Application

1. **Document Comparison**: Upload two documents to see the differences between them.
2. **Voice Search**: Upload a document and an audio file with a search keyword to find occurrences in the document.
3. **Q&A System**: Upload a document and ask questions to get AI-powered answers from the content.
4. **Summarization**: Upload a document to generate a concise summary of its contents.

## Requirements

- Python 3.7+
- Node.js 14+
- Various Python packages (see requirements.txt)
