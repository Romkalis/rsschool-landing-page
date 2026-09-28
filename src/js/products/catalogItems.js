export const catalogItems = [
      {
        id: "coffee-irish-coffee",
        category: "coffee",
        name: "Irish coffee",
        description:
          "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
        price: 7,
        image: "./assets/images/catalog/coffee-irish-coffee.png",
        alt: "Irish coffee in a glass with whipped milk",
      },
      {
        id: "coffee-kahlua-coffee",
        category: "coffee",
        name: "Kahlua coffee",
        description:
          "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
        price: 7,
        image: "./assets/images/catalog/coffee-kahlua-coffee.png",
        alt: "Kahlua coffee in a tall glass",
      },
      {
        id: "coffee-honey-raf",
        category: "coffee",
        name: "Honey raf",
        description: "Espresso with frothed milk, cream and aromatic honey",
        price: 5.5,
        image: "./assets/images/catalog/coffee-honey-raf.png",
        alt: "Honey raf in a stemmed glass with a cookie",
      },
      {
        id: "coffee-ice-cappuccino",
        category: "coffee",
        name: "Ice cappuccino",
        description:
          "Cappuccino with soft thick foam in summer version with ice",
        price: 5,
        image: "./assets/images/catalog/coffee-ice-cappuccino.png",
        alt: "Ice cappuccino in a glass with ice",
      },
      {
        id: "coffee-espresso",
        category: "coffee",
        name: "Espresso",
        description: "Classic black coffee",
        price: 4.5,
        image: "./assets/images/catalog/coffee-espresso.png",
        alt: "Espresso in a glass cup",
      },
      {
        id: "coffee-latte",
        category: "coffee",
        name: "Latte",
        description:
          "Espresso coffee with the addition of steamed milk and dense milk foam",
        price: 5.5,
        image: "./assets/images/catalog/coffee-latte.png",
        alt: "Latte in a tall glass",
      },
      {
        id: "coffee-latte-macchiato",
        category: "coffee",
        name: "Latte macchiato",
        description: "Espresso with frothed milk and chocolate",
        price: 5.5,
        image: "./assets/images/catalog/coffee-latte-macchiato.png",
        alt: "Latte macchiato in a glass mug",
      },
      {
        id: "coffee-with-cognac",
        category: "coffee",
        name: "Coffee with cognac",
        description: "Fragrant black coffee with cognac and whipped cream",
        price: 6.5,
        image: "./assets/images/catalog/coffee-with-cognac.png",
        alt: "Coffee with cognac and whipped cream",
      },

      {
        id: "tea-moroccan",
        category: "tea",
        name: "Moroccan",
        description:
          "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
        price: 4.5,
        image: "./assets/images/catalog/tea-moroccan.png",
        alt: "Moroccan tea in a glass with a teapot",
      },
      {
        id: "tea-ginger",
        category: "tea",
        name: "Ginger",
        description: "Original black tea with fresh ginger, lemon and honey",
        price: 5,
        image: "./assets/images/catalog/tea-ginger.png",
        alt: "Ginger tea in a glass with lemon",
      },
      {
        id: "tea-cranberry",
        category: "tea",
        name: "Cranberry",
        description: "Invigorating black tea with cranberry and honey",
        price: 5,
        image: "./assets/images/catalog/tea-cranberry.png",
        alt: "Cranberry tea in a glass mug",
      },
      {
        id: "tea-sea-buckthorn",
        category: "tea",
        name: "Sea buckthorn",
        description:
          "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
        price: 5.5,
        image: "./assets/images/catalog/tea-sea-buckthorn.png",
        alt: "Sea buckthorn tea with cinnamon",
      },

      {
        id: "dessert-marble-cheesecake",
        category: "dessert",
        name: "Marble cheesecake",
        description:
          "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
        price: 3.5,
        image: "./assets/images/catalog/dessert-marble-cheesecake.png",
        alt: "Slice of marble cheesecake",
      },
      {
        id: "dessert-red-velvet",
        category: "dessert",
        name: "Red velvet",
        description: "Layer cake with cream cheese frosting",
        price: 4,
        image: "./assets/images/catalog/dessert-red-velvet.png",
        alt: "Slice of red velvet cake",
      },
      {
        id: "dessert-cheesecakes",
        category: "dessert",
        name: "Cheesecakes",
        description:
          "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
        price: 4.5,
        image: "./assets/images/catalog/dessert-cheesecakes.png",
        alt: "Cheesecakes with sour cream and berries",
      },
      {
        id: "dessert-creme-brulee",
        category: "dessert",
        name: "Creme brulee",
        description:
          "Delicate creamy dessert in a caramel basket with wild berries",
        price: 4,
        image: "./assets/images/catalog/dessert-creme-brulee.png",
        alt: "Creme brulee with wild berries",
      },
      {
        id: "dessert-pancakes",
        category: "dessert",
        name: "Pancakes",
        description:
          "Tender pancakes with strawberry jam and fresh strawberries",
        price: 4.5,
        image: "./assets/images/catalog/dessert-pancakes.png",
        alt: "Pancakes with strawberries",
      },
      {
        id: "dessert-honey-cake",
        category: "dessert",
        name: "Honey cake",
        description: "Classic honey cake with delicate custard",
        price: 4.5,
        image: "./assets/images/catalog/dessert-honey-cake.png",
        alt: "Slice of honey cake",
      },
      {
        id: "dessert-chocolate-cake",
        category: "dessert",
        name: "Chocolate cake",
        description:
          "Cake with hot chocolate filling and nuts with dried apricots",
        price: 5.5,
        image: "./assets/images/catalog/dessert-chocolate-cake.png",
        alt: "Chocolate cake with dried apricots",
      },
      {
        id: "dessert-black-forest",
        category: "dessert",
        name: "Black forest",
        description:
          "A combination of thin sponge cake with cherry jam and light chocolate mousse",
        price: 6.5,
        image: "./assets/images/catalog/dessert-black-forest.png",
        alt: "Black forest cake",
      },
    ];
// Size and additive choices shown in the product modal
export const categoryOptions = {
  coffee: {
    sizes: [
      { label: "S", value: "200 ml" },
      { label: "M", value: "300 ml" },
      { label: "L", value: "400 ml" },
    ],
    additives: ["Sugar", "Cinnamon", "Syrup"],
  },
  tea: {
    sizes: [
      { label: "S", value: "200 ml" },
      { label: "M", value: "300 ml" },
      { label: "L", value: "400 ml" },
    ],
    additives: ["Sugar", "Lemon", "Syrup"],
  },
  dessert: {
    sizes: [
      { label: "S", value: "50 g" },
      { label: "M", value: "100 g" },
      { label: "L", value: "200 g" },
    ],
    additives: ["Berries", "Nuts", "Jam"],
  },
};
