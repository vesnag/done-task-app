import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

const fakeProcessTaskInputWithLLM = async () => ({
  frequency: 'weekly',
  day: 'Monday',
  time: '10:00 AM',
});

const processTaskInputWithLLM = async (taskDescription) => {
  if (process.env.USE_FAKE_API) {
    return fakeProcessTaskInputWithLLM(taskDescription);
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Extract the frequency, day, and time from the following task description: "${taskDescription}". Format the output as JSON.`,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const structuredData = response.data.choices[0].text.trim();
    return JSON.parse(structuredData);
  } catch (error) {
    console.error('Error processing task input with LLM:', error);
    throw new Error('Failed to process task input with LLM');
  }
};

export default processTaskInputWithLLM;
