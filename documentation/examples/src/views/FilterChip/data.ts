export type Restaurant = {
  id: number;
  name: string;
  cuisine: number;
  priceRange: string;
  rating: number;
  delivery: boolean;
  dietaryOptions: number[];
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Golden Spoon",
    cuisine: 9,
    priceRange: "$$$",
    rating: 4.5,
    delivery: true,
    dietaryOptions: [3, 1]
  },
  {
    id: 2,
    name: "Sushi Paradise",
    cuisine: 10,
    priceRange: "$$$$",
    rating: 4.8,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 3,
    name: "Taco Fiesta",
    cuisine: 13,
    priceRange: "$",
    rating: 4.2,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 4,
    name: "Le Petit Bistro",
    cuisine: 4,
    priceRange: "$$$$",
    rating: 4.7,
    delivery: false,
    dietaryOptions: [3]
  },
  {
    id: 5,
    name: "Dragon Wok",
    cuisine: 3,
    priceRange: "$$",
    rating: 4.3,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 6,
    name: "Burger Haven",
    cuisine: 1,
    priceRange: "$$",
    rating: 4.0,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 7,
    name: "Spice Route",
    cuisine: 8,
    priceRange: "$$",
    rating: 4.6,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 8,
    name: "Athens Grill",
    cuisine: 6,
    priceRange: "$$$",
    rating: 4.4,
    delivery: false,
    dietaryOptions: [3, 1]
  },
  {
    id: 9,
    name: "Bangkok Street Food",
    cuisine: 18,
    priceRange: "$",
    rating: 4.5,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 10,
    name: "Seoul Kitchen",
    cuisine: 11,
    priceRange: "$$",
    rating: 4.7,
    delivery: true,
    dietaryOptions: [1]
  },
  {
    id: 11,
    name: "Pizza Perfetto",
    cuisine: 9,
    priceRange: "$$",
    rating: 4.1,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 12,
    name: "Steakhouse Prime",
    cuisine: 1,
    priceRange: "$$$$",
    rating: 4.9,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 13,
    name: "Vegan Delight",
    cuisine: 20,
    priceRange: "$$",
    rating: 4.6,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 14,
    name: "Mediterranean Breeze",
    cuisine: 12,
    priceRange: "$$$",
    rating: 4.5,
    delivery: false,
    dietaryOptions: [3, 2]
  },
  {
    id: 15,
    name: "Ramen House",
    cuisine: 10,
    priceRange: "$$",
    rating: 4.4,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 16,
    name: "BBQ Smokehouse",
    cuisine: 1,
    priceRange: "$$$",
    rating: 4.3,
    delivery: true,
    dietaryOptions: []
  },
  {
    id: 17,
    name: "Dim Sum Palace",
    cuisine: 3,
    priceRange: "$$$",
    rating: 4.8,
    delivery: false,
    dietaryOptions: [3]
  },
  {
    id: 18,
    name: "Curry Club",
    cuisine: 8,
    priceRange: "$",
    rating: 4.2,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 19,
    name: "Tapas Bar",
    cuisine: 17,
    priceRange: "$$$",
    rating: 4.6,
    delivery: false,
    dietaryOptions: [3, 1]
  },
  {
    id: 20,
    name: "Pho Station",
    cuisine: 21,
    priceRange: "$",
    rating: 4.4,
    delivery: true,
    dietaryOptions: [3, 1]
  },
  {
    id: 21,
    name: "Pasta Amore",
    cuisine: 9,
    priceRange: "$$",
    rating: 4.3,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 22,
    name: "Fish Market",
    cuisine: 16,
    priceRange: "$$$$",
    rating: 4.7,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 23,
    name: "Falafel Corner",
    cuisine: 14,
    priceRange: "$",
    rating: 4.5,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 24,
    name: "Biergarten",
    cuisine: 5,
    priceRange: "$$$",
    rating: 4.2,
    delivery: false,
    dietaryOptions: [3]
  },
  {
    id: 25,
    name: "Noodle Bar",
    cuisine: 3,
    priceRange: "$",
    rating: 4.0,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 26,
    name: "Crepe Cafe",
    cuisine: 4,
    priceRange: "$$",
    rating: 4.4,
    delivery: false,
    dietaryOptions: [3, 1]
  },
  {
    id: 27,
    name: "Tandoori Nights",
    cuisine: 8,
    priceRange: "$$",
    rating: 4.7,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 28,
    name: "Samba Grill",
    cuisine: 2,
    priceRange: "$$$",
    rating: 4.6,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 29,
    name: "Poke Bowl",
    cuisine: 7,
    priceRange: "$$",
    rating: 4.5,
    delivery: true,
    dietaryOptions: [3, 1]
  },
  {
    id: 30,
    name: "Shawarma Express",
    cuisine: 14,
    priceRange: "$",
    rating: 4.3,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 31,
    name: "Trattoria Bella",
    cuisine: 9,
    priceRange: "$$$",
    rating: 4.8,
    delivery: false,
    dietaryOptions: [3, 1]
  },
  {
    id: 32,
    name: "Wing Stop",
    cuisine: 1,
    priceRange: "$",
    rating: 3.9,
    delivery: true,
    dietaryOptions: []
  },
  {
    id: 33,
    name: "Paella House",
    cuisine: 17,
    priceRange: "$$$",
    rating: 4.5,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 34,
    name: "Bento Box",
    cuisine: 10,
    priceRange: "$$",
    rating: 4.2,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 35,
    name: "Dumpling Dynasty",
    cuisine: 3,
    priceRange: "$$",
    rating: 4.6,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 36,
    name: "Gyro Palace",
    cuisine: 6,
    priceRange: "$",
    rating: 4.1,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 37,
    name: "Bistro Moderne",
    cuisine: 4,
    priceRange: "$$$$",
    rating: 4.9,
    delivery: false,
    dietaryOptions: [3, 1]
  },
  {
    id: 38,
    name: "Pad Thai Station",
    cuisine: 18,
    priceRange: "$$",
    rating: 4.4,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 39,
    name: "Lobster Shack",
    cuisine: 16,
    priceRange: "$$$",
    rating: 4.7,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 40,
    name: "Burrito Loco",
    cuisine: 13,
    priceRange: "$",
    rating: 4.0,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 41,
    name: "Kebab Kingdom",
    cuisine: 19,
    priceRange: "$$",
    rating: 4.3,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 42,
    name: "Bibimbap Bar",
    cuisine: 11,
    priceRange: "$$",
    rating: 4.5,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 43,
    name: "Cajun Kitchen",
    cuisine: 1,
    priceRange: "$$$",
    rating: 4.4,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 44,
    name: "Momo House",
    cuisine: 15,
    priceRange: "$",
    rating: 4.6,
    delivery: true,
    dietaryOptions: [3, 2]
  },
  {
    id: 45,
    name: "Croissant Cafe",
    cuisine: 4,
    priceRange: "$$",
    rating: 4.3,
    delivery: false,
    dietaryOptions: [3]
  },
  {
    id: 46,
    name: "Wok Express",
    cuisine: 3,
    priceRange: "$",
    rating: 3.8,
    delivery: true,
    dietaryOptions: [3]
  },
  {
    id: 47,
    name: "Pulled Pork Palace",
    cuisine: 1,
    priceRange: "$$",
    rating: 4.2,
    delivery: true,
    dietaryOptions: []
  },
  {
    id: 48,
    name: "Masala Magic",
    cuisine: 8,
    priceRange: "$$$",
    rating: 4.8,
    delivery: false,
    dietaryOptions: [3, 2, 1]
  },
  {
    id: 49,
    name: "Sashimi Spot",
    cuisine: 10,
    priceRange: "$$$$",
    rating: 4.9,
    delivery: false,
    dietaryOptions: [1]
  },
  {
    id: 50,
    name: "Taco Truck",
    cuisine: 13,
    priceRange: "$",
    rating: 4.4,
    delivery: true,
    dietaryOptions: [3, 2, 1]
  }
];

export type Cuisine = {
  id: number;
  name: string;
}

export const cuisines: Cuisine[] = [
  { id: 1, name: "American" },
  { id: 2, name: "Brazilian" },
  { id: 3, name: "Chinese" },
  { id: 4, name: "French" },
  { id: 5, name: "German" },
  { id: 6, name: "Greek" },
  { id: 7, name: "Hawaiian" },
  { id: 8, name: "Indian" },
  { id: 9, name: "Italian" },
  { id: 10, name: "Japanese" },
  { id: 11, name: "Korean" },
  { id: 12, name: "Mediterranean" },
  { id: 13, name: "Mexican" },
  { id: 14, name: "Middle Eastern" },
  { id: 15, name: "Nepalese" },
  { id: 16, name: "Seafood" },
  { id: 17, name: "Spanish" },
  { id: 18, name: "Thai" },
  { id: 19, name: "Turkish" },
  { id: 20, name: "Vegan" },
  { id: 21, name: "Vietnamese" }
];

export type DietaryOption = {
  id: number;
  name: string;
}

export const dietaryOptions: DietaryOption[] = [
  { id: 1, name: "Gluten-Free" },
  { id: 2, name: "Vegan" },
  { id: 3, name: "Vegetarian" }
];

export function getUniqueCuisines(): number[] {
  const cuisineIds = restaurants.map(restaurant => restaurant.cuisine);
  return Array.from(new Set(cuisineIds)).sort((a, b) => a - b);
}

export function getUniqueDietaryOptions(): number[] {
  const allOptionIds = restaurants.flatMap(restaurant => restaurant.dietaryOptions);
  return Array.from(new Set(allOptionIds)).sort((a, b) => a - b);
}
