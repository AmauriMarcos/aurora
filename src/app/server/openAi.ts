// openaiApi.ts

import OpenAI from 'openai';

// Ensure the API key exists
if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key');
  }
  

  // Initialize the OpenAI client
  export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export const generateWeatherSummary = async (prompt: string): Promise<string> => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7,
      });
  
      // Safely access content
      const content = response.choices[0]?.message?.content;
      const summary = content ? content.trim() : '';
  
      return summary;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error('OpenAI API Error:', error.status, error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
      throw new Error('Failed to generate weather summary');
    }
  };