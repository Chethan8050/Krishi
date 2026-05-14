import { NextResponse } from 'next/server';

// OpenAI Chat Integration
// Key provided: sk-1234ijklmnop5678ijklmnop1234ijklmnop5678

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessages = body.messages || [];

    const apiKey = process.env.OPENAI_API_KEY;

    // Refined System Prompt for South Indian / Karnataka Context
    const systemPrompt = {
      role: 'system',
      content: `You are "Dr. Somanna", a Senior Agricultural Scientist for KisanAI. 
      You are an expert in South Indian agriculture, specifically for crops in Karnataka like Tomato, Potato, Sugarcane, Ragi, and Rice.
      
      Your guidelines:
      1. Provide region-specific advice (e.g., mention specific local soil types like Red Soil or Black Soil).
      2. If a user describes symptoms, prioritize identifying common local diseases like Blight, Leaf Spot, or Rust.
      3. Always provide "Next Steps": (e.g., "Step 1: Isolate the plant", "Step 2: Apply [Organic/Chemical] treatment").
      4. Support multiple languages: Respond in the language the user speaks (English, Kannada, or Hindi).
      5. Tone: Knowledgeable, polite, and reassuring. Use local cultural nuances where appropriate.`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [systemPrompt, ...userMessages],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API failed: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return NextResponse.json({
      message: data.choices[0].message.content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    // Fallback response for demo purposes if API fails (e.g. invalid key)
    return NextResponse.json({
      message: "I'm currently having trouble connecting to my central brain. However, based on common issues, please ensure your crops have proper drainage and you check for early signs of fungal spots.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFallback: true
    });
  }
}
