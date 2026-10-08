/* ============================================================
   MedSupply — Product Data
   All products are static demo data. Replace image URLs with
   your real product photos before going live.
   ============================================================ */

const PRODUCTS = [
  {
    id: "ms-001",
    name: "Digital Blood Pressure Monitor",
    category: "Diagnostic",
    brand: "Omron",
    price: 89.99,
    oldPrice: 109.99,
    sku: "MS-BPM-001",
    stock: 42,
    rating: 4.8,
    reviews: 214,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
    ],
    description: "Clinically validated upper-arm blood pressure monitor with irregular heartbeat detection and 2-user memory. Ideal for clinics and home care.",
    specs: {
      "Measurement": "Oscillometric, upper arm",
      "Range": "0–299 mmHg",
      "Memory": "2 users × 60 readings",
      "Power": "4× AA or USB-C",
      "Cuff": "22–42 cm"
    }
  },
  {
    id: "ms-002",
    name: "Fingertip Pulse Oximeter",
    category: "Diagnostic",
    brand: "Contec",
    price: 34.99,
    sku: "MS-POX-002",
    stock: 120,
    rating: 4.6,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80"
    ],
    description: "Compact OLED pulse oximeter measuring SpO₂ and pulse rate with one-touch operation and auto power-off.",
    specs: {
      "SpO₂ Range": "70–100%",
      "Pulse Range": "30–250 bpm",
      "Display": "OLED, dual color",
      "Battery": "2× AAA",
      "Certification": "CE, FDA"
    }
  },
  {
    id: "ms-003",
    name: "Littmann-Classic III Stethoscope",
    category: "Diagnostic",
    brand: "3M",
    price: 99.99,
    sku: "MS-STH-003",
    stock: 30,
    rating: 4.9,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80"
    ],
    description: "Tunable diaphragm stethoscope for adult and pediatric auscultation. Excellent acoustic performance and comfortable eartips.",
    specs: {
      "Type": "Dual-head, tunable",
      "Material": "Stainless steel",
      "Tube": "Single-lumen PVC",
      "Length": "27 in"
    }
  },
  {
    id: "ms-004",
    name: "Non-Contact Infrared Thermometer",
    category: "Diagnostic",
    brand: "Braun",
    price: 49.99,
    sku: "MS-THM-004",
    stock: 85,
    rating: 4.5,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80"
    ],
    description: "Forehead thermometer with 1-second reading, silent mode, and fever indicator. Perfect for pediatric use.",
    specs: {
      "Range": "34–42.2 °C",
      "Accuracy": "±0.2 °C",
      "Response": "1 second",
      "Battery": "2× AA"
    }
  },
  {
    id: "ms-005",
    name: "Surgical Scissors Set (3 pcs)",
    category: "Surgical",
    brand: "MedLine",
    price: 44.99,
    sku: "MS-SCI-005",
    stock: 60,
    rating: 4.7,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"
    ],
    description: "Stainless steel surgical scissors set with straight, curved, and bandage scissors. Autoclavable.",
    specs: {
      "Material": "Surgical stainless steel",
      "Length": "14 cm each",
      "Sterilization": "Autoclave 134 °C",
      "Pieces": "3"
    }
  },
  {
    id: "ms-006",
    name: "Sterile Scalpel Blades #10 (100 pcs)",
    category: "Surgical",
    brand: "Swann-Morton",
    price: 12.99,
    sku: "MS-SCB-006",
    stock: 500,
    rating: 4.8,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1583912268183-211b7f8a5b0f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583912268183-211b7f8a5b0f?w=800&q=80"
    ],
    description: "Individually wrapped sterile carbon steel scalpel blades. Fits standard #3 and #4 handles.",
    specs: {
      "Type": "#10",
      "Material": "Carbon steel",
      "Packaging": "Individually sterile",
      "Quantity": "100 blades"
    }
  },
  {
    id: "ms-007",
    name: "Nitrile Exam Gloves (Box of 100)",
    category: "PPE",
    brand: "Ansell",
    price: 24.99,
    sku: "MS-GLV-007",
    stock: 300,
    rating: 4.7,
    reviews: 428,
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&q=80"
    ],
    description: "Powder-free, latex-free nitrile examination gloves. Textured fingertips for grip.",
    specs: {
      "Material": "Nitrile",
      "Size": "M (also S, L)",
      "Type": "Powder-free",
      "Quantity": "100 gloves"
    }
  },
  {
    id: "ms-008",
    name: "N95 Respirator Masks (Box of 20)",
    category: "PPE",
    brand: "3M",
    price: 39.99,
    sku: "MS-MSK-008",
    stock: 180,
    rating: 4.9,
    reviews: 602,
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80"
    ],
    description: "NIOSH-approved N95 respirators with 95% filtration efficiency and adjustable nose clip.",
    specs: {
      "Standard": "NIOSH N95",
      "Filtration": "≥ 95%",
      "Quantity": "20 masks",
      "Strap": "Dual elastic"
    }
  },
  {
    id: "ms-009",
    name: "Anti-Fog Face Shields (Pack of 10)",
    category: "PPE",
    brand: "MedSupply",
    price: 29.99,
    sku: "MS-FSH-009",
    stock: 90,
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&q=80"
    ],
    description: "Full-face protective shields with anti-fog coating and adjustable headband. Reusable after disinfection.",
    specs: {
      "Material": "PET + foam",
      "Coating": "Anti-fog",
      "Quantity": "10 shields",
      "Adjustable": "Yes"
    }
  },
  {
    id: "ms-010",
    name: "Foldable Aluminum Wheelchair",
    category: "Mobility",
    brand: "Drive",
    price: 249.99,
    oldPrice: 299.99,
    sku: "MS-WCH-010",
    stock: 25,
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1584008607342-6b8b7b3ef8e4?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584008607342-6b8b7b3ef8e4?w=800&q=80"
    ],
    description: "Lightweight foldable wheelchair with padded seat, detachable footrests, and puncture-proof tires.",
    specs: {
      "Frame": "Aluminum",
      "Weight": "11 kg",
      "Capacity": "120 kg",
      "Folded size": "78 × 30 × 90 cm"
    }
  },
  {
    id: "ms-011",
    name: "Height-Adjustable Aluminum Walker",
    category: "Mobility",
    brand: "Drive",
    price: 79.99,
    sku: "MS-WLK-011",
    stock: 55,
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1603968408819-1a7f7c9e5f4b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603968408819-1a7f7c9e5f4b?w=800&q=80"
    ],
    description: "Folding walker with 8 height settings, non-slip rubber tips, and ergonomic hand grips.",
    specs: {
      "Material": "Anodized aluminum",
      "Height": "78–96 cm",
      "Weight": "2.6 kg",
      "Capacity": "135 kg"
    }
  },
  {
    id: "ms-012",
    name: "Compressor Nebulizer Machine",
    category: "Respiratory",
    brand: "Omron",
    price: 69.99,
    sku: "MS-NEB-012",
    stock: 40,
    rating: 4.6,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
    ],
    description: "Compact compressor nebulizer with adult and pediatric masks, mouthpiece, and carrying case.",
    specs: {
      "Nebulization rate": "0.35 ml/min",
      "Particle size": "MMAD 3 μm",
      "Noise": "< 55 dB",
      "Power": "AC 220V"
    }
  },
  {
    id: "ms-013",
    name: "Portable Oxygen Concentrator",
    category: "Respiratory",
    brand: "Inogen",
    price: 899.99,
    sku: "MS-OXC-013",
    stock: 8,
    rating: 4.8,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80"
    ],
    description: "Battery-powered portable oxygen concentrator with pulse-dose delivery and 8-hour runtime. FAA-approved for air travel.",
    specs: {
      "Flow": "1–5 LPM equivalent",
      "Battery": "Up to 8 hours",
      "Weight": "2.2 kg",
      "Certification": "FAA, CE"
    }
  },
  {
    id: "ms-014",
    name: "Sterile Gauze Pads 4×4 (Pack of 100)",
    category: "Wound Care",
    brand: "Covidien",
    price: 14.99,
    sku: "MS-GZE-014",
    stock: 250,
    rating: 4.7,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80"
    ],
    description: "Sterile 12-ply cotton gauze pads for wound dressing and cleaning. Individually wrapped.",
    specs: {
      "Size": "10 × 10 cm",
      "Ply": "12",
      "Sterility": "EO sterilized",
      "Quantity": "100 pads"
    }
  },
  {
    id: "ms-015",
    name: "Adhesive Bandages Assorted (Box of 100)",
    category: "Wound Care",
    brand: "Band-Aid",
    price: 9.99,
    sku: "MS-BND-015",
    stock: 400,
    rating: 4.5,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80"
    ],
    description: "Assorted sizes and shapes of adhesive bandages with antibacterial pad and breathable backing.",
    specs: {
      "Sizes": "S / M / L / XL",
      "Pad": "Antibacterial",
      "Quantity": "100 bandages",
      "Latex-free": "Yes"
    }
  },
  {
    id: "ms-016",
    name: "Digital Lab Centrifuge 4000 RPM",
    category: "Lab",
    brand: "Eppendorf",
    price: 449.99,
    sku: "MS-CTF-016",
    stock: 12,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
    ],
    description: "Benchtop digital centrifuge with 8×15 ml rotor, timer, safety lid lock, and brushless motor.",
    specs: {
      "Max speed": "4000 RPM",
      "Rotor": "8 × 15 ml",
      "Timer": "1–99 min",
      "Display": "LCD digital"
    }
  },
  {
    id: "ms-017",
    name: "Binocular Biological Microscope",
    category: "Lab",
    brand: "Olympus",
    price: 399.99,
    sku: "MS-MIC-017",
    stock: 15,
    rating: 4.7,
    reviews: 55,
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80"
    ],
    description: "Binocular microscope with LED illumination, 4 objective lenses (4X–100X), and mechanical stage.",
    specs: {
      "Magnification": "40×–1000×",
      "Head": "Binocular 30°",
      "Illumination": "LED, adjustable",
      "Stage": "Mechanical XY"
    }
  },
  {
    id: "ms-018",
    name: "Electric Hospital Bed (3-Crank)",
    category: "Hospital Furniture",
    brand: "Hill-Rom",
    price: 1299.99,
    sku: "MS-BED-018",
    stock: 5,
    rating: 4.9,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
    ],
    description: "Adjustable electric hospital bed with side rails, IV pole, casters with brakes, and remote control.",
    specs: {
      "Positions": "Head / foot / height",
      "Capacity": "180 kg",
      "Casters": "4× 125 mm locking",
      "Control": "Wired remote"
    }
  },
  {
    id: "ms-019",
    name: "Overbed Table with Wheels",
    category: "Hospital Furniture",
    brand: "MedSupply",
    price: 149.99,
    sku: "MS-OTB-019",
    stock: 35,
    rating: 4.4,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1631815589955-0b6c8bd2c1b9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631815589955-0b6c8bd2c1b9?w=800&q=80"
    ],
    description: "Height-adjustable overbed table with wood-grain top, chrome frame, and easy-glide casters.",
    specs: {
      "Top": "Walnut laminate",
      "Height": "70–110 cm",
      "Base": "Chrome steel",
      "Capacity": "20 kg"
    }
  }
];

/* Categories used across the site (menu + filters) */
const CATEGORIES = [
  "Diagnostic",
  "Surgical",
  "PPE",
  "Mobility",
  "Respiratory",
  "Wound Care",
  "Lab",
  "Hospital Furniture"
];

/* Brands derived from product list */
const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))].sort();