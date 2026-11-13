// OSRM routing helper for LoadKaro (Real-world road distance in km)
export async function fetchRoadDistance(
  pickupLat: number, 
  pickupLon: number, 
  dropLat: number, 
  dropLon: number
): Promise<{ distanceKm: number; durationHours: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${pickupLon},${pickupLat};${dropLon},${dropLat}?overview=false`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const distanceKm = Number((route.distance / 1000).toFixed(1)); // Convert meters to km
      const durationHours = Number((route.duration / 3600).toFixed(1)); // Convert seconds to hours
      return { distanceKm, durationHours };
    }
    return null;
  } catch (error) {
    console.error('OSRM Routing Error:', error);
    return null;
  }
}
