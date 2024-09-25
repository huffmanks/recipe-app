// const ingredients = [
//     "2 cups All-Purpose Flour",
//     "1 teaspoon Baking Soda",
//     "Pinch of Salt",
//     "3/4 cup Unsalted Butter, melted",
//     "1 cup Brown Sugar, packed",
//     "1/2 cup Granulated Sugar",
//     "1 tablespoon Vanilla Extract",
//     "2-3 large Eggs",
//     "2 cups Semi-Sweet Chocolate Chips",
//     "1 cup Chopped Walnuts",
//     "Fresh Basil Leaves",
//     "Olive Oil",
//     "4 Tomatoes, diced",
//     "1 Red Onion, finely chopped",
//     "Juice of 1 Lemon",
//     "Ground Black Pepper",
//     "1/2 teaspoon Paprika",
//     "1/4 teaspoon Cayenne Pepper",
//     "1/2 cup Greek Yogurt",
//     "Honey",
//     "1 Avocado, sliced",
//     "2 cups Baby Spinach",
//     "1/2 cup Feta Cheese, crumbled",
//     "1/4 cup Balsamic Vinegar",
//     "1 tablespoon Dijon Mustard",
//     "1/2 teaspoon Dried Oregano",
//     "1/4 cup Pine Nuts, toasted",
//     "1 can Chickpeas, drained and rinsed",
//     "1/2 cup Quinoa, cooked",
//     "1/2 teaspoon Ground Cumin",
//     "1/4 teaspoon Turmeric",
//     "1/2 cup Coconut Cream",
//     "1 Mango, peeled and diced",
//     "1/2 cup Fresh Cilantro, chopped",
//     "1 Jalapeño, seeded and minced",
//     "1/2 cup Shredded Coconut",
//     "1/4 cup Soy Sauce",
//     "1 tablespoon Sesame Oil",
//     "1/2 teaspoon Ground Ginger",
//     "1 Clove Garlic, minced",
//     "1/4 cup Rice Vinegar",
//     "1/2 cup Sliced Almonds",
//     "1/4 cup Dried Cranberries",
//     "1/2 cup Pomegranate Seeds",
//     "1/4 cup Chia Seeds",
//     "1/2 cup Rolled Oats",
//     "1/4 cup Maple Syrup",
//     "1/2 cup Almond Milk",
//     "1 Banana, mashed",
//     "1/2 teaspoon Ground Cinnamon",
//     "1/4 teaspoon Nutmeg",
//     "1/2 cup Blueberries",
//     "1/4 cup Dark Chocolate Chunks",
//     "1/2 cup Peanut Butter",
//     "1/4 cup Flax Seeds",
//   ];

interface Ingredient {
  unit: string | null;
  amount: number | null;
  name: string;
}

const unitMapping = {
  bag: ["bag", "bags"],
  box: ["box", "boxes"],
  bunch: ["bunch", "bunches"],
  can: ["can", "cans"],
  carton: ["carton", "cartons"],
  clove: ["clove", "cloves"],
  container: ["container", "containers"],
  c: ["cup", "cups", "c"],
  dash: ["dash", "dashes"],
  drop: ["drop", "drops"],
  ear: ["ear", "ears"],
  "fl oz": ["fluid ounce", "fluid ounces", "fl oz"],
  ft: ["foot", "feet", "ft"],
  gal: ["gallon", "gallons", "gal"],
  g: ["gram", "grams", "g"],
  head: ["head", "heads"],
  in: ["inch", "inches", "in"],
  kg: ["kilogram", "kilograms", "kg"],
  lg: ["large", "lg"],
  l: ["liter", "liters", "l"],
  md: ["medium", "md"],
  m: ["meter", "meters", "m"],
  mg: ["milligram", "milligrams", "mg"],
  ml: ["milliliter", "milliliters", "ml"],
  mm: ["millimeter", "millimeters", "mm"],
  oz: ["ounce", "ounces", "oz"],
  pack: ["pack", "packs"],
  piece: ["piece", "pieces"],
  pinch: ["pinch", "pinches"],
  pt: ["pint", "pints", "pt"],
  lb: ["pound", "pounds", "lb", "lbs"],
  qt: ["quart", "quarts", "qt"],
  sm: ["small", "sm"],
  sprig: ["sprig", "sprigs"],
  stick: ["stick", "sticks"],
  tbsp: ["tablespoon", "tablespoons", "tbsp"],
  tsp: ["teaspoon", "teaspoons", "tsp"],
  yd: ["yard", "yards", "yd"],
};

const reverseUnitMapping: { [key: string]: string } = {};

Object.entries(unitMapping).forEach(([standardUnit, variants]) => {
  variants.forEach((variant) => {
    reverseUnitMapping[variant.toLowerCase()] = standardUnit;
  });
});

export function parseIngredients(ingredientStrings: string[]): Ingredient[] {
  const fractionRegex = /\d+\/\d+/;
  const rangeRegex = /(\d+)-(\d+)/;

  return ingredientStrings.map((ingredientStr) => {
    let amount: number | null = null;
    let unit: string | null = null;

    const rangeMatch = ingredientStr.match(rangeRegex);
    if (rangeMatch) {
      const [_, num1, num2] = rangeMatch;
      amount = (parseFloat(num1) + parseFloat(num2)) / 2;
      ingredientStr = ingredientStr.replace(rangeRegex, "").trim();
    }

    const fractionMatch = ingredientStr.match(fractionRegex);
    if (fractionMatch) {
      const [fraction] = fractionMatch;
      const [numerator, denominator] = fraction.split("/").map(Number);
      amount = numerator / denominator;
      ingredientStr = ingredientStr.replace(fraction, "").trim();
    }

    const amountMatch = ingredientStr.match(/\d+(\.\d+)?/);
    if (!amount && amountMatch) {
      amount = parseFloat(amountMatch[0]);
      ingredientStr = ingredientStr.replace(amountMatch[0], "").trim();
    }

    const words = ingredientStr.toLowerCase().split(" ");
    for (const word of words) {
      if (reverseUnitMapping[word]) {
        unit = reverseUnitMapping[word];
        ingredientStr = ingredientStr.replace(word, "").trim();
        break;
      }
    }

    const name = ingredientStr.trim().toLowerCase();

    return {
      amount: amount || null,
      unit: unit || null,
      name,
    };
  });
}
