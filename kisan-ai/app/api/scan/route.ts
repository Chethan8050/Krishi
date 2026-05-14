import { NextResponse } from 'next/server';
import { saveScanResult } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // ── Build a new FormData for the Python backend ───────────
    // The Python endpoint expects the field name 'file', not 'image'
    const mlFormData = new FormData();
    mlFormData.append('file', imageFile);

    // ── Call the Python FastAPI Server ────────────────────────
    const pythonResponse = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: mlFormData,
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      throw new Error(`ML Server error: ${errorText}`);
    }

    const pythonData = await pythonResponse.json();

    if (!pythonData.success) {
      return NextResponse.json({ 
        error: pythonData.message || 'Could not recognize plant.' 
      }, { status: 422 });
    }

    // ── Process prediction ───────────────────────────────────
    const prediction = pythonData.prediction; // e.g. "Tomato___Target_Spot"
    const confidence = pythonData.confidence;
    const isHealthy = pythonData.is_healthy; // Use the backend's logic

    let responsePayload: any;

    // Split "Crop___Disease" safely
    const parts = prediction.split('___');
    const displayCrop = parts[0]?.replace(/_/g, ' ') || 'Crop';
    const displayDisease = parts.length > 1 ? parts[1].replace(/_/g, ' ') : prediction;

    if (isHealthy) {
      responsePayload = {
        status: 'healthy' as const,
        crop: displayCrop,
        confidence: confidence,
        message: `Your ${displayCrop} looks perfectly healthy!`,
        tips: [
          `Continue current watering schedule for ${displayCrop}.`,
          'Monitor leaves weekly for any changes in color.',
          'Ensure the soil remains nutrient-rich for optimal growth.'
        ]
      };
    } else {
      responsePayload = {
        status: 'disease' as const,
        crop: displayCrop,
        disease: displayDisease,
        confidence: confidence,
        severity: confidence > 0.8 ? 'High' : 'Moderate',
        treatment: [
          `Identify the specific stage of ${displayDisease} infection.`,
          `Apply a recommended fungicide suitable for ${displayCrop}.`,
          'Remove and safely dispose of infected leaves.',
          'Improve spacing between plants to reduce humidity.'
        ]
      };
    }

    // ── Persist scan result to Supabase (fire-and-forget) ────
    saveScanResult({
      crop: responsePayload.crop,
      disease: isHealthy ? null : responsePayload.disease,
      status: responsePayload.status,
      confidence: responsePayload.confidence,
      severity: isHealthy ? null : responsePayload.severity,
      treatment: isHealthy ? null : responsePayload.treatment,
      tips: isHealthy ? responsePayload.tips : null,
      image_url: null, // Could upload to Supabase Storage later
    }).catch(err => console.error('[Scan] Supabase save failed:', err));

    return NextResponse.json(responsePayload);

  } catch (error: any) {
    console.error('Scan API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to connect to ML server.' }, { status: 500 });
  }
}
