export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let longitude = searchParams.get('longitude');
    let latitude = searchParams.get('latitude');
    let API_KEY = process.env.NEXT_PUBLIC_MAPS_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&result_type=neighborhood`;
    const res = await fetch(url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json',
        },
    });
}