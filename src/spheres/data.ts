export const SPHERES = {
  SUN: "Sun",
  MERCURY: "Mercury",
  VENUS: "Venus",
  EARTH: "Earth",
  MARS: "Mars",
  JUPITER: "Jupiter",
  SATURN: "Saturn",
  URANUS: "Uranus",
  NEPTUNE: "Neptune",
} as const;

export type Sphere = (typeof SPHERES)[keyof typeof SPHERES];

export const sphereData = [
  {
    title: SPHERES.MERCURY,
    orbitRadius: 5,
    orbitSpeed: 0.4,
    initialAngle: 0.2,
    rotationSpeed: 0.002,
    texture: new URL(
      "../assets/uv-maps/mercury-uv/mercury.jpg",
      import.meta.url,
    ).href,
    sphereArgs: [0.25, 32, 32] as [number, number?, number?],
    sunIntensity: 1.2,
    nightDarkness: 0.05,
    id: 0,
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Despite its proximity to the Sun, it's not the hottest planet.",
    facts: [
      "A day on Mercury lasts 59 Earth days",
      "Mercury has no atmosphere or moons",
      "Temperatures range from -290°F to 800°F (-180°C to 430°C)",
    ],
  },
  {
    title: SPHERES.VENUS,
    orbitRadius: 9,
    orbitSpeed: 0.3,
    initialAngle: 1.4,
    rotationSpeed: 0.001,
    texture: new URL("../assets/uv-maps/venus-uv/venus.jpg", import.meta.url)
      .href,
    sphereArgs: [0.65, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 1,
    description:
      "Venus is the second planet from the Sun and the hottest planet in our solar system. It's often called Earth's twin due to similar size.",
    facts: [
      "Venus rotates backwards compared to most planets",
      "A day on Venus is longer than its year",
      "Surface temperature is hot enough to melt lead (462°C/864°F)",
    ],
  },
  {
    title: SPHERES.EARTH,
    orbitRadius: 13,
    orbitSpeed: 0.25,
    initialAngle: 2.6,
    rotationSpeed: 0.005,
    texture: new URL(
      "../assets/uv-maps/earth-uv/earth-day.jpg",
      import.meta.url,
    ).href,
    sphereArgs: [0.7, 32, 32] as [number, number?, number?],
    sunIntensity: 1.5,
    nightDarkness: 0.05,
    id: 2,
    description:
      "Earth is the third planet from the Sun and the only known planet to harbor life. It's the densest planet in our solar system.",
    facts: [
      "Earth is the only planet not named after a Greek or Roman deity",
      "70% of Earth's surface is covered by water",
      "Earth has one natural satellite: the Moon",
    ],
  },
  {
    title: SPHERES.MARS,
    orbitRadius: 17,
    orbitSpeed: 0.2,
    initialAngle: 3.4,
    rotationSpeed: 0.005,
    texture: new URL("../assets/uv-maps/mars-uv/mars.jpg", import.meta.url)
      .href,
    sphereArgs: [0.4, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 3,
    description:
      "Mars is the fourth planet from the Sun, often called the Red Planet due to iron oxide on its surface. It has the largest dust storms in the solar system.",
    facts: [
      "Mars has the tallest mountain in the solar system: Olympus Mons",
      "A day on Mars is about 24 hours and 37 minutes",
      "Mars has two small moons: Phobos and Deimos",
    ],
  },
  {
    title: SPHERES.JUPITER,
    orbitRadius: 23,
    orbitSpeed: 0.15,
    initialAngle: 4.5,
    rotationSpeed: 0.01,
    texture: new URL(
      "../assets/uv-maps/jupiter-uv/jupiter.jpg",
      import.meta.url,
    ).href,
    sphereArgs: [1.5, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 4,
    description:
      "Jupiter is the largest planet in our solar system and the fifth from the Sun. It's a gas giant with a Great Red Spot storm larger than Earth.",
    facts: [
      "Jupiter has at least 79 known moons",
      "Jupiter's Great Red Spot has been raging for over 350 years",
      "Jupiter acts as a 'vacuum cleaner' protecting inner planets from asteroids",
    ],
  },
  {
    title: SPHERES.SATURN,
    orbitRadius: 30,
    orbitSpeed: 0.1,
    initialAngle: 5.2,
    rotationSpeed: 0.009,
    texture: new URL("../assets/uv-maps/saturn-uv/saturn.jpg", import.meta.url)
      .href,
    sphereArgs: [1.3, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 5,
    description:
      "Saturn is the sixth planet from the Sun, famous for its spectacular ring system. It's the least dense planet and could float in water.",
    facts: [
      "Saturn's rings are made of ice and rock particles",
      "Saturn has at least 82 known moons, including Titan",
      "A day on Saturn is only 10.7 hours long",
    ],
  },
  {
    title: SPHERES.URANUS,
    orbitRadius: 38,
    orbitSpeed: 0.075,
    initialAngle: 0.9,
    rotationSpeed: 0.0075,
    texture: new URL("../assets/uv-maps/uranus-uv/uranus.jpg", import.meta.url)
      .href,
    sphereArgs: [1.0, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 6,
    description:
      "Uranus is the seventh planet from the Sun and has a unique sideways rotation. It's an ice giant with a faint ring system.",
    facts: [
      "Uranus rotates on its side at a 98-degree angle",
      "Uranus has 27 known moons named after Shakespeare characters",
      "Uranus was the first planet discovered with a telescope (1781)",
    ],
  },
  {
    title: SPHERES.NEPTUNE,
    orbitRadius: 46,
    orbitSpeed: 0.05,
    initialAngle: 2.1,
    rotationSpeed: 0.006,
    texture: new URL(
      "../assets/uv-maps/neptune-uv/neptune.jpg",
      import.meta.url,
    ).href,
    sphereArgs: [0.95, 32, 32] as [number, number?, number?],
    sunIntensity: 1,
    nightDarkness: 0.05,
    id: 7,
    description:
      "Neptune is the eighth and farthest known planet from the Sun. It's an ice giant with the fastest winds in the solar system.",
    facts: [
      "Neptune's winds can reach speeds of 1,200 mph (2,000 km/h)",
      "Neptune has 14 known moons, with Triton being the largest",
      "Neptune takes 165 Earth years to orbit the Sun once",
    ],
  },
];
