import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const USE_FAKE_OPENAI_API = process.env.REACT_APP_USE_FAKE_OPENAI_API === 'true';
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

const fakeProcessTaskInputWithLLM = async () => ({
  frequency: 'weekly',
  day: 'Monday',
  time: '10:00 AM',
});

const processTaskInputWithLLM = async (taskDescription) => {
  if (USE_FAKE_OPENAI_API) {
    return fakeProcessTaskInputWithLLM(taskDescription);
  }

  /**
   * TODO Write a function that processes a task description using the OpenAI Language Model (LLM).
   *
   * Every morning"
      Frequency: daily
      Day: null or any (since it applies every day)
      Time: morning (to be translated into specific hours, e.g., 8:00 AM)
    "Friday evening"
      Frequency: weekly
      Day: Friday
      Time: evening (to be translated into specific hours, e.g., 6:00 PM)
   */
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Extract the frequency, day (if applicable), and time of day from the following task description: "${taskDescription}". Format the output as JSON with keys "frequency", "day", and "time". If a field is not applicable, set it to null.`,
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
