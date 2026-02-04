import { useState } from "react";

type Planet = {
  name: string;
  key: string;
};

const planets: Planet[] = [
  { name: "Sun", key: "sun" },
  { name: "Mercury", key: "mercury" },
  { name: "Venus", key: "venus" },
  { name: "Earth", key: "earth" },
  { name: "Mars", key: "mars" },
  { name: "Jupiter", key: "jupiter" },
  { name: "Saturn", key: "saturn" },
  { name: "Uranus", key: "uranus" },
  { name: "Neptune", key: "neptune" },
];

type PlanetSelectorProps = {
  selectedPlanet: string;
  onSelectPlanet: (planet: string) => void;
};

export const PlanetSelector = ({
  selectedPlanet,
  onSelectPlanet,
}: PlanetSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "12px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          backdropFilter: "blur(10px)",
        }}
      >
        Focus: {planets.find((p) => p.key === selectedPlanet)?.name || "Sun"} ▼
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {planets.map((planet) => (
            <button
              key={planet.key}
              onClick={() => {
                onSelectPlanet(planet.key);
                setIsOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 20px",
                backgroundColor:
                  selectedPlanet === planet.key
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                color: "white",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (selectedPlanet !== planet.key) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlanet !== planet.key) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {planet.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
