import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEETS_API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL;

export async function GET(request: NextRequest) {
  try {
    if (!GOOGLE_SHEETS_API_URL) {
      return NextResponse.json(
        { success: false, error: 'Google Sheets API URL not configured' },
        { status: 500 }
      );
    }

    // Get the query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const endpoint = queryString ? `?${queryString}` : '';
    
    console.log('Proxying request to:', `${GOOGLE_SHEETS_API_URL}${endpoint}`);
    
    // Make request to Google Apps Script
    const response = await fetch(`${GOOGLE_SHEETS_API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Google Apps Script error:', response.status, response.statusText);
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data from Google Apps Script:', data);
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!GOOGLE_SHEETS_API_URL) {
      return NextResponse.json(
        { success: false, error: 'Google Sheets API URL not configured' },
        { status: 500 }
      );
    }

    // Get the query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const endpoint = queryString ? `?${queryString}` : '';
    
    // Get the request body
    const body = await request.text();
    
    console.log('Proxying POST request to:', `${GOOGLE_SHEETS_API_URL}${endpoint}`);
    
    // Make request to Google Apps Script
    const response = await fetch(`${GOOGLE_SHEETS_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      console.error('Google Apps Script error:', response.status, response.statusText);
      throw new Error(`Google Apps Script responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data from Google Apps Script:', data);
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
