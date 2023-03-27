const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require("../../assets/img/images/background_01.png"),
    bannerImage: require("../../assets/img/images/landingpic2.png"),
    title: "Choose a Favourite Food",
    description:
      "When you oder Eat Street, we’ll hook you up with exclusive coupon, specials and rewards",
  },
  {
    id: 2,
    backgroundImage: require("../../assets/img/images/background_02.png"),
    bannerImage: require("../../assets/img/images/Banner1.png"),
    title: "Hot Delivery to Home",
    description:
      "We make food ordering fast, simple and free-no matter if you order online or cash",
  },
  {
    id: 3,
    backgroundImage: require("../../assets/img/images/background_01.png"),
    bannerImage: require("../../assets/img/images/landingpic1.png"),
    title: "Receive the Great Food",
    description:
      "You’ll receive the great food within a hour. And get free delivery credits for every order.",
  },
];

const messages = [
  {
    id: 1,
    title: "Discount",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "09:05",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
  {
    id: 2,
    title: "Sale",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "02:10",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
  {
    id: 3,
    title: "Discount",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "01:20",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
];

const Favorites = [
  {
    id: 1,
    name: "Hamburger",
    price: "49.00",
    distance: 3,
    time: 35,
    image: require("../../assets/img/dummyData/hamburger.png"),
  },
  {
    id: 2,
    name: "Spaghetti",
    price: "65.00",
    distance: 3,
    time: 20,
    image: require("../../assets/img/dummyData/spag.png"),
  },
  {
    id: 3,
    name: "Hotdog",
    price: "50.00",
    distance: 3,
    time: 25,
    image: require("../../assets/img/dummyData/hot_dog.png"),
  },
];

const pastnotifications = [
  {
    id: 1,
    title: "Discount",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "09:05",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
  {
    id: 2,
    title: "Sale",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "02:10",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
  {
    id: 3,
    title: "lmao",
    icon: require("../../assets/img/icons/coupon.png"),
    date: "Feb 2",
    time: "01:20",
    description: "Lorem ipsum dolor s elit. Faucibus pellentesque",
  },
];

const restaurant = [
  {
    id: 7,
    name: "Jollibee",
    distance: 4,
    time: 30,
    description:
      "Jollibee is the largest fast food chain brand in the Philippines, operating a network of more than 1,500 stores in 17 countries. A dominant market leader in the Philippines",
    image: require("../../assets/img/images/jollibee_logo.png"),
  },
  {
    id: 4,
    name: "McDonald's",
    distance: 10,
    time: 30,
    description:
      "McDonald's predominantly sells hamburgers, various types of chicken, chicken sandwiches, French fries, soft drinks, breakfast items, and desserts.",
    image: require("../../assets/img/images/mcdonalds-png-logo-simple-m-1.png"),
  },
  {
    id: 6,
    name: "Chowking",
    distance: 10,
    time: 30,
    description:
      "Chowking is a quick-service Chinese restaurant with Filipino inspired flavors. Originally from the Philippines, Chowking combines traditional Chinese cuisine with modern fast-food service",
    image: require("../../assets/img/images/chowking.png"),
  },
];
const activityLog = [
  {
    id: 1,
    food_item: "Chicken Adobo",
    icon: require("../../assets/img/icons/coupon.png"),
    price: 400,
    time: "2:00pm",
    date: "01/12/2023",
    address: "Block 2 Lot 5 Phase 2 Celina Homes",
  },
  {
    id: 1,
    food_item: "Chicken Adobo",
    icon: require("../../assets/img/icons/coupon.png"),
    price: 400,
    time: "3:00pm",
    date: "02/12/2023",
    address: "Block 2 Lot 5 Phase 2 Celina Homes",
  },
  {
    id: 1,
    food_item: "Chicken Adobo",
    icon: require("../../assets/img/icons/coupon.png"),
    price: 300,
    time: "3:30pm",
    date: "03/12/2023",
    address: "Block 2 Lot 5 Phase 2 Celina Homes",
  },
];

const screens = {
  main_layout: "MainLayout",
  home: "Home",
  search: "Search",
  cart: "Cart",
  favourite: "Favourite",
  notification: "Notification",
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.favourite,
  },
  {
    id: 4,
    label: screens.notification,
  },
];

const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: "Burger",
  },
  {
    id: 2,
    label: "Fast Food",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Dessert",
  },
  {
    id: 5,
    label: "Breakfast",
  },
  {
    id: 6,
    label: "Vegetable",
  },
];

const bodyMeasurements = [
  {
    id: 1,
    height: 167,
    weight: 65,
    bmi: 18.5,
    status: "Normal",
  },
];

const survey1 = [
  {
    label: "Burger",
    Value: 0,
  },
  {
    label: "Chicken",
    Value: 1,
  },
  {
    label: "Pork",
    Value: 2,
  },
];

const captcha = [
  {
    id: 1,
    image: require("../../assets/img/images/captcha1.png"),
    text: "Ts14ay",
  },
  {
    id: 2,
    image: require("../../assets/img/images/captcha2.png"),
    text: "CS41gO",
  },
  {
    id: 3,
    image: require("../../assets/img/images/captcha3.png"),
    text: "AG71Sh",
  },
  {
    id: 4,
    image: require("../../assets/img/images/captcha4.png"),
    text: "VLM113",
  },
  {
    id: 5,
    image: require("../../assets/img/images/captcha5.png"),
    text: 'ANE13S'
  {
    id: 6,
    image: require("../../assets/img/images/captcha6.png"),
    text: 'ASk111'
  },
  {
    id: 7,
    image: require("../../assets/img/images/captcha7.png"),
    text: 'ApHN18'
  },
  {
    id: 8,
    image: require("../../assets/img/images/captcha8.png"),
    text: 'APVSK1'
  },
];

export default {
  survey1,
  activityLog,
  messages,
  onboarding_screens,
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  bodyMeasurements,
  restaurant,
  pastnotifications,
  Favorites,
  captcha,
};
