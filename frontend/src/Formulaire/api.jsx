import axios from 'axios';


const API_URL = "https://victorious-danica-mou1d-befcedca.koyeb.app";

export const getDiabetesPrediction = async (formData) => {
  try {
    
    let glucoseValue = parseFloat(formData.glucose);
    
    
    if (glucoseValue < 10) {
      glucoseValue = glucoseValue * 100;
    }

    const payload = {
      age: parseInt(formData.age),
      bmi: parseFloat(formData.bmi),
      HbA1c_level: parseFloat(formData.hba1c),
      blood_glucose_level: glucoseValue
    };

    
    const response = await axios.post(`${API_URL}/predict/`, payload);
    
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'IA :", error);
    throw error;
  }
};