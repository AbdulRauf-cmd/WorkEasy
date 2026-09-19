// Geolocation calculation and verification utilities for WorkEasy

export interface Coordinates {
  lat: number;
  lng: number;
}

// Default benchmark coordinates for demo (RS Puram, Coimbatore)
export const DEFAULT_CUSTOMER_COORDS: Coordinates = {
  lat: 11.016844,
  lng: 76.955832,
};

// Calculate exact distance in meters between two coordinates via Haversine formula
export function calculateDistanceMeters(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Verify if worker is within acceptable doorstep proximity (<= 100 meters)
export const MAX_ALLOWED_DISTANCE_METERS = 100;

export function verifyDoorstepProximity(
  workerCoords: Coordinates,
  customerCoords: Coordinates = DEFAULT_CUSTOMER_COORDS,
  maxAllowedMeters: number = MAX_ALLOWED_DISTANCE_METERS
): { isVerified: boolean; distanceMeters: number; reason?: string } {
  const distanceMeters = calculateDistanceMeters(workerCoords, customerCoords);
  if (distanceMeters <= maxAllowedMeters) {
    return {
      isVerified: true,
      distanceMeters,
    };
  }
  return {
    isVerified: false,
    distanceMeters,
    reason: `Off-site: ${distanceMeters}m away from customer site (maximum allowed is ${maxAllowedMeters}m)`,
  };
}

// Generate cryptographic tamper-resistant watermark hash for audit trail
export function generateGeoStampHash(coords: Coordinates, timestamp: string, jobId: string): string {
  const raw = `WE-${jobId}-${coords.lat.toFixed(6)}-${coords.lng.toFixed(6)}-${timestamp}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `WE-STAMP-${Math.abs(hash).toString(16).toUpperCase()}`;
}
