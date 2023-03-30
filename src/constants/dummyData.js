// const myProfile = {
//     name: "ByProgrammers",
//     profile_image: images.profile,
//     address: "No. 88, Jln Padungan, Kuching"
// }

const Restaurant = [
  {
    id: 7,
    name: "Jollibee",
    icon: require("../../assets/img/images/jollibee_logo.png"),
    distance: 2,
  },
  {
    id: 8,
    name: "McDonalds",
    icon: require("../../assets/img/images/mcdonalds-png-logo-simple-m-1.png"),
    distance: "3.8",
  },
  {
    id: 9,
    name: "Chowking",
    icon: require("../../assets/img/images/chowking.png"),
    distance: "1.1",
  },
];

const Discount = [
  {
    id: 1,
    name: "Free Delivery",
    icon: require("../../assets/img/icons/discount.png"),
  },
  {
    id: 2,
    name: "10% OFF",
    icon: require("../../assets/img/icons/discount.png"),
  },
  {
    id: 3,
    name: "30% OFF",
    icon: require("../../assets/img/icons/discount.png"),
  },
  {
    id: 4,
    name: "50% OFF",
    icon: require("../../assets/img/icons/discount.png"),
  },
];

const other_restaurant = [
  {
    merchant_id: 1,
    restaurantcategories: [1],
    name: "Mang Inasal",
    time: 15,
    distance: 3,
    label: "Filipino",
    food: "Chicken",
    type: "Fast Food",
    documents: [
      {
        logo: require("../../assets/img/images/manginasal.png"),
      },
    ],
  },
  {
    merchant_id: 2,
    name: "KFC",
    restaurantcategories: [2],
    icon: require("../../assets/img/images/kfc-logo-1.png"),
    time: 40,
    distance: 5,
    label: "American",
    food: "Fried Chicken",
    type: "Fast Food",
  },
  {
    merchant_id: 3,
    name: "Greenwich",
    restaurantcategories: [3],
    icon: require("../../assets/img/images/Greenwich_Pizza_logo.png"),
    time: 20,
    distance: 5,
    label: "Filipino",
    food: "Pizza",
    type: "Restaurant",
  },
];

const KFC_categories = [
  {
    id: 1,
    name: "All Food",
    icon: require("../../assets/img/icons/junk_food.png"),
  },
  {
    id: 2,
    name: "Chicken",
    icon: require("../../assets/img/icons/Drumstick.png"),
  },
  {
    id: 3,
    name: "Chicken Sandwich",
    icon: require("../../assets/img/icons/burger.png"),
  },
  {
    id: 4,
    name: "Desserts",
    icon: require("../../assets/img/dummyData/sundae.png"),
  },
];

const Manginasal_categories = [
  {
    id: 1,
    name: "All Food",
    icon: require("../../assets/img/icons/junk_food.png"),
  },
  {
    id: 2,
    name: "Chicken",
    icon: require("../../assets/img/icons/chicken_icon.png"),
  },
  {
    id: 3,
    name: "Pork BBQ",
    icon: require("../../assets/img/icons/porkbbq.png"),
  },
  {
    id: 4,
    name: "Liempo",
    icon: require("../../assets/img/icons/liempo.png"),
  },
];

const Greenwich_categories = [
  {
    id: 1,
    name: "All Food",
    icon: require("../../assets/img/icons/junk_food.png"),
  },
  {
    id: 2,
    name: "Pizza",
    icon: require("../../assets/img/icons/pizza.png"),
  },
  {
    id: 3,
    name: "Pasta",
    icon: require("../../assets/img/icons/spaghetti.png"),
  },
  {
    id: 4,
    name: "Chicken Meal",
    icon: require("../../assets/img/icons/chicken_icon.png"),
  },
];

const categories = [
  {
    id: 1,
    name: "All Food",
    icon: require("../../assets/img/icons/junk_food.png"),
  },
  {
    id: 2,
    name: "Burger",
    icon: require("../../assets/img/icons/burger.png"),
  },
  {
    id: 3,
    name: "Hotdog",
    icon: require("../../assets/img/icons/hot-dog.png"),
  },
  {
    id: 4,
    name: "Spaghetti",
    icon: require("../../assets/img/icons/spaghetti.png"),
  },
  {
    id: 5,
    name: "Desserts",
    icon: require("../../assets/img/dummyData/cupcake.png"),
  },
];

const track_order_status = [
  {
    id: 1,
    title: "Order Processed",
    sub_title: "Your order has been received",
  },
  {
    id: 2,
    title: "Delivery on Progress",
    sub_title: "Hang on! Your food is on the way",
  },
  {
    id: 3,
    title: "Delivered",
    sub_title: "Enjoy your meal!",
  },
];

const myCard = [
  {
    id: 1,
    name: "COD",
    image: require("../../assets/img/icons/5578525.png"),
  },
];

const newCard = [
  {
    id: 1,
    name: "Apple Pay",
    image: require("../../assets/img/icons/ApplePayLogo.png"),
  },
  {
    id: 2,
    name: "Google Pay",
    image: require("../../assets/img/icons/Google_Pay_logo_PNG5.png"),
  },
];

const meatSuggestion = [
  {
    id: 1,
    name: "Burger",
    image: require("../../assets/img/dummyData/hamburger.png"),
  },
  {
    id: 2,
    name: "Steak",
    image: require("../../assets/img/dummyData/steak.png"),
  },
  {
    id: 3,
    name: "Chicken",
    image: require("../../assets/img/dummyData/chicken.png"),
  },
];

const dessertSuggestion = [
  {
    id: 1,
    name: "Ice Cream",
    image: require("../../assets/img/icons/ApplePayLogo.png"),
  },
  {
    id: 2,
    name: "Apple Pie",
    image: require("../../assets/img/icons/Google_Pay_logo_PNG5.png"),
  },
  {
    id: 3,
    name: "Cake",
    image: require("../../assets/img/icons/VisaLogo.png"),
  },
];

const myCart = [
  {
    id: 1,
    name: "Burger",
    quantity: 1,
    price: "49.00",
    image: require("../../assets/img/dummyData/hamburger.png"),
  },
  {
    id: 2,
    name: "Spaghetti",
    quantity: 1,
    price: "65.00",
    image: require("../../assets/img/dummyData/spag.png"),
  },
  {
    id: 3,
    name: "Hotdog",
    quantity: 1,
    price: "50.00",
    image: require("../../assets/img/dummyData/hot_dog.png"),
  },
  {
    id: 4,
    name: "Mango Pie",
    quantity: 1,
    price: "63.00",
    image: require("../../assets/img/dummyData/mangopie.png"),
  },
  {
    id: 5,
    name: "Sundae",
    quantity: 1,
    price: "63.00",
    image: require("../../assets/img/dummyData/sundae.png"),
  },
];

const hamburger = {
  product_id: 10,
  name: "Hamburger",
  name2: "Ingredients",
  description:
    "A hamburger, or simply burger, is a food consisting of a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1],
  restaurantcategories: [1, 3],
  price: "49.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/hamburger.png"),
  time: 35,
  distance: 3,
};

const chowking = {
  product_id: 2,
  name: "Pancit Bihon",
  description: "Delicious pancit bihon",
  categories: [3],
  restaurantcategories: [1, 4],
  price: "100.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/chowking.png"),
  time: 30,
  distance: 3,
};

const Spaghetti = {
  product_id: 3,
  name: "Spaghetti",
  description: "Delicious spaghetti",
  categories: [2],
  restaurantcategories: [1, 2],
  price: "65.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/spag.png"),
  time: 20,
  distance: 3,
};

const Hotdog = {
  product_id: 4,
  name: "Hotdog",
  description: "Delicious hotdog in bread",
  categories: [1],
  restaurantcategories: [1],
  price: "50.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/hot_dog.png"),
  time: 25,
  distance: 3,
};

const MangoPie = {
  product_id: 5,
  name: "MangoPie",
  description: "Delicious mangopie",
  categories: [1, 5],
  restaurantcategories: [1],
  price: "63.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/mangopie.png"),
  time: 25,
  distance: 3,
};

const Sundae = {
  product_id: 6,
  name: "Sundae",
  description: "Delicious Sundae",
  categories: [2],
  restaurantcategories: [1],
  price: "48.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/sundae.png"),
  time: 25,
  distance: 3,
};

const Mcdo_Chicken_Sandwich = {
  product_id: 7,
  name: "Chicken Sandwich",
  description: "McDonald's Chicken Sandwich",
  categories: [2],
  restaurantcategories: [1],
  price: "57.00",
  calories: 470,
  isFavourite: false,
  image: require("../../assets/img/dummyData/mcdonalds_chicken_sandwich.png"),
  time: 25,
  distance: 3,
};

const Dimsum_Chowking = {
  product_id: 8,
  name: "Dimsum Chao Fan",
  description: "Chowking Dimsum Chao Fan",
  categories: [3],
  restaurantcategories: [1],
  price: "107.00",
  calories: 607,
  isFavourite: false,
  image: require("../../assets/img/dummyData/chowking_dimsum.png"),
  time: 25,
  distance: 3,
};

const Halo_halo_chowking = {
  product_id: 9,
  name: "Halo-halo",
  description: "Chowking Halo-halo",
  categories: [3],
  restaurantcategories: [1],
  price: "63.00",
  calories: 153,
  isFavourite: false,
  image: require("../../assets/img/dummyData/Halo_halo.png"),
  time: 25,
  distance: 3,
};

const Manginasal_chicken = {
  product_id: 1,
  name: "Chicken",
  name2: "Ingredients",
  description: "Delicious Mang inasal 1 Chicken",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 2],
  restaurantcategories: [1, 3],
  price: "140.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/manginasal_chicken.png"),
  time: 35,
  distance: 3,
};

const Manginasal_liempo = {
  product_id: 2,
  name: "Liempo",
  name2: "Ingredients",
  description: "Delicious Mang inasal Liempo",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 4],
  restaurantcategories: [1, 3],
  price: "174.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/manginasal_liempo.png"),
  time: 35,
  distance: 3,
};

const Manginasal_bbq = {
  product_id: 3,
  name: "Pork Barbeque",
  name2: "Ingredients",
  description: "Delicious Mang Inasal Pork Barbeque",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 3],
  restaurantcategories: [1, 3],
  price: "140.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/pork_bbq.png"),
  time: 35,
  distance: 3,
};

const Chicken_meal = {
  product_id: 1,
  name: "Chicken With Rice",
  name2: "Ingredients",
  description: "Delicious Chicken with rice KFC",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 2],
  restaurantcategories: [1, 3],
  price: "100.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/chicken_meal.png"),
  time: 35,
  distance: 3,
};

const Chicken_sandwich = {
  product_id: 2,
  name: "Chicken Sandwich",
  name2: "Ingredients",
  description: "Delicious Chicken Sandwich KFC",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 3],
  restaurantcategories: [1, 3],
  price: "165.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/Chicken_sandwich.png"),
  time: 35,
  distance: 3,
};

const Sundae_kfc = {
  product_id: 3,
  name: "Sundae",
  name2: "Ingredients",
  description: "Delicious dessert KFC",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 4],
  restaurantcategories: [1, 3],
  price: "50.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/sundae.png"),
  time: 35,
  distance: 3,
};

const Pizza = {
  product_id: 1,
  name: "Pizza",
  name2: "Ingredients",
  description: "Delicious pizza in Greenwich",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 2],
  restaurantcategories: [1, 3],
  price: "133.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/pizza.png"),
  time: 35,
  distance: 3,
};

const Pasta = {
  product_id: 2,
  name: "Pasta",
  name2: "Ingredients",
  description: "Delicious pasta in Greenwich",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 3],
  restaurantcategories: [1, 3],
  price: "122.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/pasta.png"),
  time: 35,
  distance: 3,
};

const Chicken_Greenwich = {
  product_id: 3,
  name: "Chicken",
  name2: "Ingredients",
  description: "Delicious Chicken Meal in Greenwich",
  ingredients:
    "454 grams ground beef about 1 pound 1 tbsp olive oil, 1 tsp paprika, 1 tsp onion powder, 1 tsp garlic salt, 1 tbsp oyster sauce, ½ tsp black peppe, 1 large eg, 5 burger buns",
  categories: [1, 4],
  restaurantcategories: [1, 3],
  price: "120.00",
  calories: 78,
  isFavourite: false,
  image: require("../../assets/img/dummyData/chicken_greenwich.png"),
  time: 35,
  distance: 3,
};

const surveyData = [
  {
    Hotdog: {
      id: 4,
      name: "Hotdog",
      description: "Delicious hot dog in bread",
      image: require("../../assets/img/dummyData/hot_dog.png"),
    },
    Spaghetti: {
      id: 3,
      name: "Spaghetti",
      description: "Delicous spaghetti",
      image: require("../../assets/img/dummyData/spag.png"),
    },
  },
  {
    burger: {
      id: 1,
      name: "Hamburger",
      description: "Burger",
      image: require("../../assets/img/dummyData/hamburger.png"),
    },
    hotTacos: {
      id: 2,
      name: "Hot Tacos",
      description: "Hot Tacos",
      image: require("../../assets/img/dummyData/hot_tacos.png"),
    },
  },
];

const menu_restaurant = [
  {
    id: 1,
    name: "All Food",
    list: [
      hamburger,
      Spaghetti,
      Hotdog,
      chowking,
      MangoPie,
      Sundae,
      Mcdo_Chicken_Sandwich,
      Dimsum_Chowking,
      Halo_halo_chowking,
    ],
  },
  {
    id: 2,
    name: "Jollibee",
    list: [hamburger, Spaghetti, Hotdog, chowking, MangoPie, Sundae],
  },
  {
    id: 3,
    name: "McDonalds",
    list: [hamburger, Spaghetti, Hotdog, chowking, MangoPie, Sundae],
  },
  {
    id: 4,
    name: "Chowking",
    list: [hamburger, Spaghetti, Hotdog, chowking, MangoPie, Sundae],
  },
];

const KFC_menu = [
  {
    id: 1,
    name: "Trending",
    list: [Chicken_meal, Chicken_sandwich, Sundae_kfc],
  },
];

const Manginasal_menu = [
  {
    id: 1,
    name: "Trending",
    list: [Manginasal_bbq, Manginasal_chicken, Manginasal_liempo],
  },
];

const Greenwich_menu = [
  {
    id: 1,
    name: "Trending",
    list: [Pizza, Pasta, Chicken_Greenwich],
  },
];

const menu = [
  {
    id: 1,
    name: "Nearby you",
    list: [hamburger, Spaghetti, Hotdog, MangoPie, Sundae],
  },
  {
    id: 2,
    name: "Popular",
    list: [hamburger, chowking, Hotdog, MangoPie, Sundae],
  },
  {
    id: 3,
    name: "Trending",
    list: [hamburger, Spaghetti, Hotdog, MangoPie, Sundae],
  },
  {
    id: 4,
    name: "Recommended",
    list: [hamburger, chowking, Hotdog, MangoPie, Sundae],
  },
];

const my_cart = [
  {
    id: 1,
    name: "Jollibee",
    location: "Bagong Silang",
    quantity: 1,
    time: 30,
    distance: 1,
    icon: require("../../assets/img/images/jollibee_logo.png"),
  },
  {
    id: 2,
    name: "McDonalds",
    location: "Vicas",
    quantity: 2,
    time: 30,
    distance: 2,
    icon: require("../../assets/img/images/mcdonalds-png-logo-simple-m-1.png"),
  },
  {
    id: 3,
    name: "Mang Inasal",
    location: "Bagong Silang",
    quantity: 1,
    time: 20,
    distance: 0.8,
    icon: require("../../assets/img/images/manginasal.png"),
  },
];

export default {
  //   myProfile,
  categories,
  menu,
  hamburger,
  myCart,
  myCard,
  newCard,
  track_order_status,
  surveyData,
  meatSuggestion,
  dessertSuggestion,
  Restaurant,
  menu_restaurant,
  Discount,
  other_restaurant,
  Manginasal_categories,
  Manginasal_menu,
  KFC_categories,
  KFC_menu,
  Greenwich_categories,
  Greenwich_menu,
  my_cart,
};
