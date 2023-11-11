export const recommendedIntakesAdultMale: {
  [key: string]: { amount: number | null; unit_name: string };
} = {
  Water: {
    amount: 3.7,
    unit_name: "L",
  },
  Carbohydrates: {
    amount: 130,
    unit_name: "G",
  },
  "Carbohydrate, by difference": {
    amount: 130,
    unit_name: "G",
  },
  "Fiber, total dietary": {
    amount: 38,
    unit_name: "G",
  },
  Lipids: {
    amount: null, // not determined
    unit_name: "G",
  },
  Protein: {
    amount: 56,
    unit_name: "G",
  },
  "Vitamin A": {
    amount: 900,
    unit_name: "UG",
  },
  "Vitamin C": {
    amount: 90,
    unit_name: "UG",
  },
  "Vitamin D": {
    amount: 15,
    unit_name: "UG",
  },
  "Vitamin E": {
    amount: 15,
    unit_name: "UG",
  },
  "Vitamin K": {
    amount: 120,
    unit_name: "UG",
  },
  Thiamin: {
    amount: 1.2,
    unit_name: "MG",
  },
  Riboflavin: {
    amount: 1.3,
    unit_name: "MG",
  },
  Niacin: {
    amount: 16,
    unit_name: "MG",
  },
  "Vitamin B-6": {
    amount: 1.3,
    unit_name: "MG",
  },
  Folate: {
    amount: 400,
    unit_name: "UG",
  },
  "Vitamin B-12": {
    amount: 2.4,
    unit_name: "UG",
  },
  Biotin: {
    amount: 30,
    unit_name: "UG",
  },
  "Choline, total": {
    amount: 550,
    unit_name: "MG",
  },
  "Calcium, Ca": {
    amount: 1300,
    unit_name: "MG",
  },
  "Chromium, Cr": {
    amount: 35,
    unit_name: "UG",
  },
  "Copper, Cu": {
    amount: 900,
    unit_name: "UG",
  },
  "Fluoride, F": {
    amount: 4,
    unit_name: "MG",
  },
  "Iodine, I": {
    amount: 150,
    unit_name: "UG",
  },
  "Iron, Fe": {
    amount: 8,
    unit_name: "MG",
  },
  "Magnesium, Mg": {
    amount: 400,
    unit_name: "MG",
  },
  "Manganese, Mn": {
    amount: 2.3,
    unit_name: "MG",
  },
  "Phosphorus, P": {
    amount: 700,
    unit_name: "MG",
  },
  "Selenium, Se": {
    amount: 55,
    unit_name: "UG",
  },
  "Zinc, Zn": {
    amount: 11,
    unit_name: "MG",
  },
  "Potassium, K": {
    amount: 3400,
    unit_name: "MG",
  },
  "Sodium, Na": {
    amount: 1500,
    unit_name: "MG",
  },
  "Chloride, Cl": {
    amount: 2300,
    unit_name: "MG",
  },
};

export const NutritionChartNames = {
  macro: {
    names: [
      // "Water",
      "Protein",
      "Lipids",
      "Fatty acids, total monounsaturated",
      "Fatty acids, total polyunsaturated",
      "Fatty acids, total saturated",
      "Fatty acids, total trans",
      "Carbohydrates",
      "Carbohydrate, by difference",
      "Carbohydrate, by summation",
      "Carbohydrate, other",
      "Sugars, Total",
      "Sugars, added",
      "Cholesterol",
      "Fiber, soluble",
      "Fiber, insoluble",
      "Fiber, total dietary",
      // "Soluble dietary fiber (SDFP+SDFS)",
      // "Insoluble dietary fiber (IDF)",
      // "Ash",
      // "Energy",
    ],
  },
  micro: {
    minerals: {
      names: [
        "Iron, Fe",
        "Iron, heme",
        "Iron, non-heme",
        "Potassium, K",
        "Copper, Cu",
        "Magnesium, Mg",
        "Calcium, Ca",
        "Fluoride, F",
        "Phosphorus, P",
        "Sodium, Na",
        "Sulfur, S",
        "Zinc, Zn",
      ],
    },
    vitamins: {
      names: [
        "Vitamin A, RAE",
        "Vitamin A, RE",
        "Vitamin B-12",
        "Vitamin B-6",
        "Vitamin C, total ascorbic acid",
        "Vitamin C, added",
        "Vitamin C, intrinsic",
        "Vitamin D (D2 + D3), International Units",
        "Vitamin D4",
        "Vitamin E",
        "Vitamin E, added",
        // "Vitamin E (label entry primarily)",
        "Vitamin K (Dihydrophylloquinone)",
        "Vitamin K (phylloquinone)",
        "Vitamin K (Menaquinone-4)",
        "Vitamins and Other Components", // ?
        "Riboflavin",
        "Riboflavin, intrinsic",
        "Folate, total",
        "Niacin",
        "Thiamin",
        "Thiamin, added",
        "Flavonoids, total",
        "Leucine", // amino acid
        "Lycopene", // phytochemical from tomatoes
        "Choline, total",
        "Biotin",
      ],
    },
  },
  other: {
    names: [
      "Silicon, Si",
      "Other carotenoids",
      "Lactic acid",
      "Sorbitol",
      "Polyphenols, total",
      "Zeaxanthin",
      "Nitrates",
      "Citric Acid",
      "Carotene, alpha",
      "Carotene, beta",
      "Carotene",
      "Caffeine",
      "Fructose",
      "Galactose",
      "Glucose",
      "Lead, Pb",
      "Total sugar alcohols",
    ],
  },
};
