import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const { searchParams } = new URL(request.url);
    
    // Construct the target URL
    const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { success: false, error: 'API URL not configured' },
        { status: 500 }
      );
    }

    // Reconstruct the full path with query parameters
    const fullPath = path.join('/');
    const queryString = searchParams.toString();
    const targetUrl = `${baseUrl}/${fullPath}${queryString ? `?${queryString}` : ''}`;

    console.log('Proxying GET request to:', targetUrl);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy GET error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const { searchParams } = new URL(request.url);
    
    // Construct the target URL
    const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { success: false, error: 'API URL not configured' },
        { status: 500 }
      );
    }

    // Reconstruct the full path with query parameters
    const fullPath = path.join('/');
    const queryString = searchParams.toString();
    const targetUrl = `${baseUrl}/${fullPath}${queryString ? `?${queryString}` : ''}`;

    console.log('Proxying POST request to:', targetUrl);

    const body = await request.json();

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy POST error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
