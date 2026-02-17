
export interface MedicineDetails {
  name: string;
  scientificName: string;
  manufacturer: string;
  strength: string;
  activeIngredients: string[];
  indications: string[];
  dosage: string;
  sideEffects: string[];
  warnings: string[];
  isPrescriptionNeeded: boolean;
}

export enum AppState {
  HOME = 'HOME',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
