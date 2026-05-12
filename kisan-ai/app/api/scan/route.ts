import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Call the Python FastAPI Server running locally
    const pythonResponse = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      throw new Error(`ML Server error: ${errorText}`);
    }

    const pythonData = await pythonResponse.json();
    
    // Process prediction
    const prediction = pythonData.prediction;
    const confidence = pythonData.confidence;
    const isHealthy = prediction === 'healthy';

    if (isHealthy) {
      return NextResponse.json({
        status: 'healthy',
        crop: 'Detected Crop',
        confidence: confidence,
        message: 'Your crop looks perfectly healthy!',
        tips: [
          'Maintain current watering schedule.',
          'Continue monitoring for early signs of pests.',
          'Ensure adequate sunlight for optimal growth.'
        ]
      });
    } else {
      // Map disease names to more user-friendly output if needed
      // Format: "Crop___Disease" -> "Disease"
      const displayDisease = prediction.split('___').pop()?.replace(/_/g, ' ') || prediction;
      const displayCrop = prediction.split('___')[0]?.replace(/_/g, ' ') || 'Crop';

      return NextResponse.json({
        status: 'disease',
        crop: displayCrop,
        disease: displayDisease,
        confidence: confidence,
        severity: confidence > 0.8 ? 'High' : 'Moderate',
        treatment: [
          'Isolate the infected plant if possible.',
          'Apply recommended organic or chemical fungicide.',
          'Improve air circulation and avoid overhead watering.',
          'Consult a local agronomist for specific pesticides.'
        ]
      });
    }

  } catch (error: any) {
    console.error('Scan API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to connect to ML server.' }, { status: 500 });
  }
}

