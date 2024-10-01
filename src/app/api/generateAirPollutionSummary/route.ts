import { NextRequest, NextResponse } from 'next/server';
import { generateWeatherSummary } from '@/app/server/openAi';
import { WeatherData } from '@/app/types/weatherApi';

function generatePrompt(pm2_5: number): string {
    
    return `Write a very short, friendly yet professional summary about the air quality with the value ${pm2_5}.

    The summary should be conversational and easy to understand.`;
  }

  export async function POST(request: NextRequest) {
    try {
      const { pm2_5 } = await request.json();
  
      if (!pm2_5) {
        return NextResponse.json({ error: 'Missing pm2_5 data' }, { status: 400 });
      }
  
      const prompt = generatePrompt(pm2_5);
  
      const summary = await generateWeatherSummary(prompt);
  
      return NextResponse.json({ summary });
    } catch (error) {
      console.error('Error generating weather pm2_5 summary:', error);
      return NextResponse.json({ error: 'Failed to generate weather pm2_5 summary' }, { status: 500 });
    }
  }