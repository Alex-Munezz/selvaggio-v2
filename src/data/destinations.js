import maraImage from "../assets/mara.JPG";
import amboseliImage from "../assets/amboseli.jpg";
import nairobiImage from "../assets/nairobi.JPG";

const destinations = [
  {
    id: "maasai-mara",
    name: "Maasai Mara",
    region: "Narok County · Kenya",
    shortDescription:
      "A legendary wilderness of endless grasslands, extraordinary wildlife and unforgettable safari moments.",
    description:
      "The Maasai Mara is one of Africa's most celebrated wildlife destinations. Its sweeping plains are home to extraordinary concentrations of wildlife, making every game drive an opportunity for discovery.",
    image: maraImage,
    highlights: [
      "The Big Five",
      "Great Migration",
      "Maasai culture",
      "Year-round wildlife",
    ],
  },
  {
    id: "amboseli",
    name: "Amboseli",
    region: "Kajiado County · Kenya",
    shortDescription:
      "Iconic elephants, open plains and breathtaking views of Mount Kilimanjaro.",
    description:
      "Amboseli offers one of Kenya's most recognisable safari landscapes. Large elephant herds move across open plains beneath the dramatic presence of Mount Kilimanjaro.",
    image: amboseliImage,
    highlights: [
      "Elephant herds",
      "Mount Kilimanjaro views",
      "Birdlife",
      "Scenic landscapes",
    ],
  },
  {
    id: "nairobi",
    name: "Nairobi",
    region: "Nairobi County · Kenya",
    shortDescription:
      "Where the energy of Kenya's capital meets the wild heart of Africa.",
    description:
      "Nairobi offers a unique introduction to Kenya, combining vibrant city life with remarkable wildlife experiences just beyond the urban centre.",
    image: nairobiImage,
    highlights: [
      "Nairobi National Park",
      "Giraffe Centre",
      "David Sheldrick Wildlife Trust",
      "City experiences",
    ],
  },
];

export default destinations;