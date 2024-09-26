import axios from 'axios';

// Set up your OpenAI API key (replace with your key)
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/completions";

// Function to send the user input to the OpenAI API for processing
export const processTaskInputWithLLM = async (taskDescription) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo-instruct", // Use the model specified in the curl example
        prompt: `Extract the frequency, day, and time from the following task description: "${taskDescription}". Format the output as JSON.`,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const structuredData = response.data.choices[0].text.trim();
    return JSON.parse(structuredData); // Assuming the model outputs valid JSON
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
