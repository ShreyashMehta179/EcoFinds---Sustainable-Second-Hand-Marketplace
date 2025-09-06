export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  condition: "Excellent" | "Good" | "Fair"
  seller: string
  location: string
  isEcoFriendly?: boolean
}

export const categories = [
  "Clothing & Fashion",
  "Furniture & Home Decor",
  "Electronics & Gadgets",
  "Books & Stationery",
  "Kids & Baby Products",
  "Sports & Outdoor Gear",
  "Household Essentials",
  "Eco-Friendly Special Products",
] as const

export const mockProducts: Product[] = [
  // Clothing & Fashion
  {
    id: "1",
    name: "Ethnic Kurta Set",
    price: 499,
    category: "Clothing & Fashion",
    description:
      "Beautiful handwoven ethnic kurta set in excellent condition. Perfect for festivals and special occasions.",
    image: "/images/kurta.jpg",
    condition: "Excellent",
    seller: "Priya Sharma",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "2",
    name: "Leather Handbag",
    price: 799,
    category: "Clothing & Fashion",
    description: "Genuine leather handbag with multiple compartments. Gently used with minimal wear.",
    image: "/images/LeatherHandbag.jpg",
    condition: "Good",
    seller: "Anjali Gupta",
    location: "Delhi, NCR",
  },
  {
    id: "3",
    name: "Upcycled Denim Jacket",
    price: 899,
    category: "Clothing & Fashion",
    description: "Creatively upcycled denim jacket with unique patches and embroidery. One-of-a-kind piece.",
    image: "/images/DenimJacket.jpg",
    condition: "Excellent",
    seller: "Eco Fashion Studio",
    location: "Bangalore, Karnataka",
    isEcoFriendly: true,
  },

  // Furniture & Home Decor
  {
    id: "4",
    name: "Wooden Study Table",
    price: 2999,
    category: "Furniture & Home Decor",
    description: "Solid wood study table with drawers. Perfect for home office or student use.",
    image: "/images/WoodenStudyTable.jpg",
    condition: "Good",
    seller: "Rajesh Kumar",
    location: "Pune, Maharashtra",
  },
  {
    id: "5",
    name: "Handmade Bamboo Lamp",
    price: 699,
    category: "Furniture & Home Decor",
    description: "Eco-friendly bamboo table lamp with warm LED lighting. Handcrafted by local artisans.",
    image: "/images/BambooLamp.jpg",
    condition: "Excellent",
    seller: "Green Living Co.",
    location: "Goa",
    isEcoFriendly: true,
  },
  {
    id: "6",
    name: "Wall Art (Recycled Wood)",
    price: 1199,
    category: "Furniture & Home Decor",
    description: "Beautiful wall art made from recycled wood pieces. Adds rustic charm to any space.",
    image: "/images/WallArt.jpg",
    condition: "Excellent",
    seller: "Artisan Collective",
    location: "Jaipur, Rajasthan",
    isEcoFriendly: true,
  },

  // Electronics & Gadgets
  {
    id: "7",
    name: "Refurbished iPhone X",
    price: 12999,
    category: "Electronics & Gadgets",
    description: "Professionally refurbished iPhone X with 6 months warranty. Battery health 85%.",
    image: "/images/RefurbishediPhoneX.jpg",
    condition: "Good",
    seller: "TechSecond",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "8",
    name: "Microwave Oven",
    price: 4499,
    category: "Electronics & Gadgets",
    description: "LG microwave oven in working condition. 20L capacity, perfect for small families.",
    image: "/images/MicrowaveOven.jpg",
    condition: "Good",
    seller: "Home Appliances Hub",
    location: "Hyderabad, Telangana",
  },
  {
    id: "9",
    name: "Wireless Headphones",
    price: 1599,
    category: "Electronics & Gadgets",
    description: "Sony wireless headphones with noise cancellation. Excellent sound quality.",
    image: "/images/WirelessHeadphones.jpg",
    condition: "Excellent",
    seller: "Audio World",
    location: "Kolkata, West Bengal",
  },

  // Books & Stationery
  {
    id: "10",
    name: "Harry Potter Book Set",
    price: 999,
    category: "Books & Stationery",
    description: "Complete Harry Potter series in good condition. Perfect for young readers.",
    image: "/images/HarryPotterBookSet.jpg",
    condition: "Good",
    seller: "Book Lover",
    location: "Ahmedabad, Gujarat",
  },
  {
    id: "11",
    name: "Spiral Notebook (Recycled)",
    price: 99,
    category: "Books & Stationery",
    description: "Eco-friendly spiral notebook made from recycled paper. 200 pages.",
    image: "/images/SpiralNotebook.jpg",
    condition: "Excellent",
    seller: "Green Stationery",
    location: "Kochi, Kerala",
    isEcoFriendly: true,
  },
  {
    id: "12",
    name: "Acrylic Paint Set",
    price: 249,
    category: "Books & Stationery",
    description: "Professional acrylic paint set with 12 colors. Barely used, perfect for artists.",
    image: "/images/AcrylicPaintSet.jpg",
    condition: "Excellent",
    seller: "Art Supplies Store",
    location: "Indore, Madhya Pradesh",
  },

  // Kids & Baby Products
  {
    id: "13",
    name: "Baby Stroller",
    price: 3499,
    category: "Kids & Baby Products",
    description: "Lightweight baby stroller with safety harness. Folds easily for storage.",
    image: "/images/BabyStroller.jpg",
    condition: "Good",
    seller: "Baby Care Center",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    id: "14",
    name: "Toy Train Set",
    price: 499,
    category: "Kids & Baby Products",
    description: "Wooden toy train set with tracks. Educational and fun for toddlers.",
    image: "/images/ToyTrainSet.jpg",
    condition: "Good",
    seller: "Toy Junction",
    location: "Chandigarh",
  },
  {
    id: "15",
    name: "Learning Kit",
    price: 799,
    category: "Kids & Baby Products",
    description: "Educational learning kit with puzzles, blocks, and activity books for ages 3-6.",
    image: "/images/LearningKit.jpg",
    condition: "Excellent",
    seller: "Smart Kids",
    location: "Bhopal, Madhya Pradesh",
  },

  // Sports & Outdoor Gear
  {
    id: "16",
    name: "Bicycle (Hero Sprint)",
    price: 4999,
    category: "Sports & Outdoor Gear",
    description: "Hero Sprint bicycle in good condition. 21-speed gear system, perfect for city rides.",
    image: "/images/Bicycle.jpg",
    condition: "Good",
    seller: "Cycle World",
    location: "Nagpur, Maharashtra",
  },
  {
    id: "17",
    name: "Camping Tent",
    price: 2499,
    category: "Sports & Outdoor Gear",
    description: "4-person camping tent with waterproof material. Great for weekend adventures.",
    image: "/images/CampingTent.jpg",
    condition: "Good",
    seller: "Adventure Gear",
    location: "Shimla, Himachal Pradesh",
  },
  {
    id: "18",
    name: "Cricket Bat",
    price: 799,
    category: "Sports & Outdoor Gear",
    description: "Kashmir willow cricket bat, size 6. Well-maintained and ready for matches.",
    image: "/images/CricketBat.jpg",
    condition: "Good",
    seller: "Sports Corner",
    location: "Vadodara, Gujarat",
  },

  // Household Essentials
  {
    id: "19",
    name: "Steel Water Bottle",
    price: 299,
    category: "Household Essentials",
    description: "Stainless steel water bottle, 1L capacity. BPA-free and eco-friendly.",
    image: "/images/SteelWaterBottle.jpg",
    condition: "Excellent",
    seller: "Eco Essentials",
    location: "Coimbatore, Tamil Nadu",
    isEcoFriendly: true,
  },
  {
    id: "20",
    name: "Kitchen Utensil Set",
    price: 1199,
    category: "Household Essentials",
    description: "Complete kitchen utensil set with spatulas, ladles, and serving spoons.",
    image: "/images/KitchenUtensilSet.jpg",
    condition: "Good",
    seller: "Kitchen World",
    location: "Surat, Gujarat",
  },
  {
    id: "21",
    name: "Eco-friendly Broom",
    price: 149,
    category: "Household Essentials",
    description: "Traditional broom made from natural fibers. Biodegradable and effective.",
    image: "/images/EcoFriendlyBroom.jpg",
    condition: "Excellent",
    seller: "Natural Living",
    location: "Mysore, Karnataka",
    isEcoFriendly: true,
  },

  // Eco-Friendly Special Products
  {
    id: "22",
    name: "Compost Bin",
    price: 1499,
    category: "Eco-Friendly Special Products",
    description: "Home composting bin for kitchen waste. Includes instruction manual and starter kit.",
    image: "/images/CompostBin.jpg",
    condition: "Excellent",
    seller: "Green Solutions",
    location: "Thiruvananthapuram, Kerala",
    isEcoFriendly: true,
  },
  {
    id: "23",
    name: "Bamboo Toothbrush (Pack of 4)",
    price: 199,
    category: "Eco-Friendly Special Products",
    description: "Biodegradable bamboo toothbrushes with soft bristles. Pack of 4 for family use.",
    image: "/images/BambooToothbrush.jpg",
    condition: "Excellent",
    seller: "Eco Dental Care",
    location: "Pondicherry",
    isEcoFriendly: true,
  },
  {
    id: "24",
    name: "Reusable Cotton Bag",
    price: 99,
    category: "Eco-Friendly Special Products",
    description: "Handwoven cotton shopping bag. Strong, washable, and plastic-free alternative.",
    image: "/images/ReusableCottonBag.jpg",
    condition: "Excellent",
    seller: "Sustainable Living",
    location: "Udaipur, Rajasthan",
    isEcoFriendly: true,
  },
]

export function getProductsByCategory(category?: string): Product[] {
  if (!category) return mockProducts
  return mockProducts.filter((product) => product.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id)
}
