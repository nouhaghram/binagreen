// Source unique des matières et des tarifs indicatifs (en TND).
// Pour changer un prix ou ajouter une matière, on modifie ce fichier seulement.
export interface MaterialInfo {
  label: string;
  unit: 'kg' | 'L';
  rate: number;
}

export const MATERIAL_RATES: Record<string, MaterialInfo> = {
  Plastic: { label: 'Plastique', unit: 'kg', rate: 0.8 },
  Glass: { label: 'Verre', unit: 'kg', rate: 0.4 },
  Cardboard: { label: 'Carton', unit: 'kg', rate: 0.3 },
  Oil: { label: 'Huile usagée', unit: 'L', rate: 1.5 },
  Aluminum: { label: 'Aluminium', unit: 'kg', rate: 2.5 }
};