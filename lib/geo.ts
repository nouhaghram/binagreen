// Outils de géographie : centres des gouvernorats, distance, petit décalage.
export type LatLng = [number, number]; // [latitude, longitude]

// Centres approximatifs des 4 gouvernorats du Grand Tunis
export const DISTRICT_CENTERS: Record<string, LatLng> = {
  Tunis: [36.8065, 10.1815],
  Ariana: [36.8665, 10.1647],
  'Ben Arous': [36.7531, 10.2189],
  Manouba: [36.8101, 10.0863],
};

// Point de référence pour calculer les distances (plus tard : la position de l'utilisateur)
export const REFERENCE_POINT: LatLng = DISTRICT_CENTERS.Tunis;

// Distance en km entre deux points (formule de Haversine)
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371; // rayon de la Terre en km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Décale légèrement un point (environ 1 km) pour que deux annonces du même
// gouvernorat ne tombent pas exactement au même endroit.
export function jitter([lat, lng]: LatLng): LatLng {
  return [lat + (Math.random() - 0.5) * 0.02, lng + (Math.random() - 0.5) * 0.02];
}