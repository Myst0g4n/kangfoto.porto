import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Dapatkan URL dasar Strapi dan API key dari environment variable
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const strapiApiKey = process.env.NEXT_PUBLIC_STRAPI_KEY;

    if (!strapiBaseUrl) {
      return Response.json(
        { error: 'NEXT_PUBLIC_STRAPI_URL environment variable is not set' },
        { status: 500 }
      );
    }

    if (!strapiApiKey) {
      return Response.json(
        { error: 'NEXT_PUBLIC_STRAPI_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    // Bangun URL lengkap untuk endpoint members
    const apiUrl = `${strapiBaseUrl}/api/members?populate=*`;

    // Ambil data dari API Strapi dengan otentikasi
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${strapiApiKey}`, // Gunakan token otentikasi
      },
      cache: 'no-store', // Jangan cache data agar selalu mendapatkan data terbaru
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Strapi API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Strapi API response:', JSON.stringify(data, null, 2)); // Log untuk debugging

    // Format data sesuai dengan struktur yang diharapkan oleh frontend
    // Berdasarkan respons API, data berada dalam array data
    if (!data || !Array.isArray(data.data)) {
      console.error('Unexpected data format from Strapi API:', data);
      throw new Error('Unexpected data format from Strapi API');
    }

    const members = data.data.map((item: any) => ({
      id: item.id,
      name: item.name || item.attributes?.name || '',
      experience: item.field || item.attributes?.field || item.experiences || item.attributes?.experiences || '',
      quote: item.quote || item.attributes?.quote || '',
      photo: item.photo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.photo.url}`
        : item.attributes?.photo?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.photo.url}`
          : '/placeholder-team-member.jpg', // fallback image
    }));

    return Response.json(members);
  } catch (error: any) {
    console.error('Error fetching members data:', error);
    return Response.json(
      { error: 'Failed to fetch members data', details: error.message },
      { status: 500 }
    );
  }
}