
// This is the API client for the Flask backend

const API_BASE_URL = "http://localhost:5000";

export async function compareFiles(file1: File, file2: File): Promise<any> {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  
  try {
    const response = await fetch(`${API_BASE_URL}/comparefile`, {
      method: "POST",
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error comparing files:", error);
    return { error: "Failed to compare files. Server may be unavailable." };
  }
}

export async function searchWithVoice(audioFile: File, documentFile: File): Promise<any> {
  const formData = new FormData();
  formData.append("audio_file", audioFile);
  formData.append("document_file", documentFile);
  
  try {
    const response = await fetch(`${API_BASE_URL}/search_in_document_with_voice`, {
      method: "POST",
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error searching document with voice:", error);
    return { error: "Failed to search. Server may be unavailable." };
  }
}

export async function askQuestions(documentFile: File, questions: string[]): Promise<any> {
  const formData = new FormData();
  formData.append("document_file", documentFile);
  
  questions.forEach((question) => {
    formData.append("questions[]", question);
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/qamodel`, {
      method: "POST",
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error asking questions:", error);
    return { error: "Failed to get answers. Server may be unavailable." };
  }
}

export async function summarizeDocument(file: File, sentences: number = 5): Promise<any> {
  const formData = new FormData();
  formData.append("document_file", file);
  formData.append("num_sentences", sentences.toString());
  
  try {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Server error occurred" };
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error summarizing document:", error);
    return { error: "Failed to summarize document. Server may be unavailable." };
  }
}

export async function encodeText(text: string, method: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/encode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, method }),
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error encoding text:", error);
    return { error: "Failed to encode text. Server may be unavailable." };
  }
}

export async function decodeText(text: string, method: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/decode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, method }),
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error decoding text:", error);
    return { error: "Failed to decode text. Server may be unavailable." };
  }
}

export async function translateText(text: string, targetLang: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, target_lang: targetLang }),
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error translating text:", error);
    return { error: "Failed to translate text. Server may be unavailable." };
  }
}
