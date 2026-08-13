import maraImage from "../assets/mara.JPG";
import amboseliImage from "../assets/amboseli.jpg";
import nairobiImage from "../assets/nairobi.JPG";

const packages = [
  {
    id: "maasai-mara-escape",
    name: "Maasai Mara Escape",
    destination: "Maasai Mara",
    duration: "3 Days · 2 Nights",
    category: "Wildlife Safari",
    shortDescription:
      "A classic safari through the legendary Maasai Mara, surrounded by extraordinary wildlife and endless savannah.",
    description:
      "Experience the magic of the Maasai Mara on a carefully crafted safari designed around wildlife, landscapes and unforgettable moments in one of Kenya's most iconic destinations.",
    image: maraImage,
    highlights: [
      "Game drives",
      "Big Five wildlife",
      "Maasai cultural experience",
      "Sunrise & sunset viewing",
    ],
  },
  {
    id: "amboseli-kilimanjaro",
    name: "Amboseli & Kilimanjaro",
    destination: "Amboseli",
    duration: "3 Days · 2 Nights",
    category: "Wildlife & Landscapes",
    shortDescription:
      "Meet Kenya's iconic elephants beneath the magnificent backdrop of Mount Kilimanjaro.",
    description:
      "Journey into Amboseli for spectacular wildlife encounters, expansive landscapes and unforgettable views of Africa's highest mountain.",
    image: amboseliImage,
    highlights: [
      "Elephant encounters",
      "Mount Kilimanjaro views",
      "Game drives",
      "Scenic landscapes",
    ],
  },
  {
    id: "kenya-discovery",
    name: "Kenya Discovery",
    destination: "Nairobi & Beyond",
    duration: "5 Days · 4 Nights",
    category: "Kenya Experience",
    shortDescription:
      "A taste of Kenya combining wildlife, culture, landscapes and the energy of Nairobi.",
    description:
      "Discover the different sides of Kenya through a journey that brings together wildlife encounters, cultural experiences and the vibrant character of Nairobi.",
    image: nairobiImage,
    highlights: [
      "Nairobi experiences",
      "Wildlife encounters",
      "Cultural discovery",
      "Scenic landscapes",
    ],
  },
];

export default packages;