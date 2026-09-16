export interface MaterialPricing {
  id: string;
  name: string;
  costPerGram: number;
  description: string;
  recommendedFor: string;
}

export interface SizeTierPricing {
  id: string;
  name: string;
  rangeLabel: string;
  baseFee: number;
}

export interface ComplexityPricing {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export const pricingConfig = {
  hourlyMachineRate: 8.5, // $ per hour of 3D printing
  setupFee: 10, // Base job setup & prep fee

  materials: [
    {
      id: "pla",
      name: "Overture PLA",
      costPerGram: 0.04,
      description: "Standard, rigid, multi-color high detail",
      recommendedFor: "General prototypes, visual models, decorative items",
    },
    {
      id: "petg",
      name: "PETG (Durable)",
      costPerGram: 0.06,
      description: "Impact & weather resistant, chemical safe",
      recommendedFor: "Functional parts, outdoor brackets, water-tight containers",
    },
    {
      id: "abs",
      name: "ABS / ASA (High Heat)",
      costPerGram: 0.07,
      description: "High temperature resistance, tough",
      recommendedFor: "Automotive components, hot environments",
    },
    {
      id: "tpu",
      name: "Flexible TPU",
      costPerGram: 0.09,
      description: "Rubber-like flexibility, high shock absorption",
      recommendedFor: "Gaskets, phone cases, bumpers, vibration dampeners",
    },
  ] as MaterialPricing[],

  scanSizeTiers: [
    {
      id: "small",
      name: "Handheld / Small",
      rangeLabel: "< 6 inches (15 cm)",
      baseFee: 35,
    },
    {
      id: "medium",
      name: "Medium Component",
      rangeLabel: '6" to 18" (15-45 cm)',
      baseFee: 75,
    },
    {
      id: "large",
      name: "Large Part / Assembly",
      rangeLabel: '18"+ (45 cm+)',
      baseFee: 150,
    },
  ] as SizeTierPricing[],

  scanComplexities: [
    {
      id: "inspection",
      name: "Dimensional Inspection Only",
      multiplier: 1.0,
      description: "Raw mesh capture & basic dimensional verification",
    },
    {
      id: "reproduction",
      name: "3D Print Reproduction",
      multiplier: 1.25,
      description: "Clean watertight mesh generation ready for 3D printing",
    },
    {
      id: "cad",
      name: "CAD Reverse Engineering",
      multiplier: 1.6,
      description: "Full parametric STEP file creation with mechanical features",
    },
  ] as ComplexityPricing[],
};

export function calculatePrintEstimate(
  materialId: string,
  weightGrams: number,
  timeHours: number
): { min: number; max: number; average: number } {
  const material =
    pricingConfig.materials.find((m) => m.id === materialId) ||
    pricingConfig.materials[0];

  const materialTotal = weightGrams * material.costPerGram;
  const machineTotal = timeHours * pricingConfig.hourlyMachineRate;
  const baseTotal = pricingConfig.setupFee + materialTotal + machineTotal;

  // Add 15% range buffer
  const min = Math.max(15, Math.round(baseTotal * 0.9));
  const max = Math.round(baseTotal * 1.15);
  const average = Math.round((min + max) / 2);

  return { min, max, average };
}

export function calculateScanEstimate(
  sizeTierId: string,
  complexityId: string
): { min: number; max: number; average: number } {
  const size =
    pricingConfig.scanSizeTiers.find((s) => s.id === sizeTierId) ||
    pricingConfig.scanSizeTiers[0];
  const complexity =
    pricingConfig.scanComplexities.find((c) => c.id === complexityId) ||
    pricingConfig.scanComplexities[0];

  const estimatedBase = size.baseFee * complexity.multiplier;

  const min = Math.round(estimatedBase * 0.95);
  const max = Math.round(estimatedBase * 1.2);
  const average = Math.round((min + max) / 2);

  return { min, max, average };
}
