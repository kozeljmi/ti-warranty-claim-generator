export const calculatorModels = [
  "TI-84 Plus CE-T Python Edition",
  "TI-84 Plus CE-T",
  "TI-84 Plus CE",
  "TI-84 Plus C Silver Edition",
  "TI-84 Plus",
  "TI-83 Premium CE Python Edition",
  "TI-83 Premium CE",
  "TI-Nspire CX II-T CAS",
  "TI-Nspire CX II-T",
  "TI-Nspire CX II CAS",
  "TI-Nspire CX II",
  "TI-Nspire CX CAS",
  "TI-Nspire CX",
  "TI-30X Pro MathPrint",
  "TI-30X Plus MathPrint",
  "Other",
] as const;

export type CalculatorModel = (typeof calculatorModels)[number];
