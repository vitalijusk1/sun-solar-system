import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { sphereData, SPHERES } from "../../spheres/data";

const SUN_ID = -1;
const SUN_DATA = {
  title: SPHERES.SUN,
  description:
    "The Sun is the star at the center of our solar system. It's a nearly perfect sphere of hot plasma that provides light and heat to Earth.",
  facts: [
    "The Sun contains 99.86% of the Solar System's mass",
    "The Sun's core temperature reaches 15 million°C (27 million°F)",
    "Light from the Sun takes 8 minutes to reach Earth",
  ],
};

export const PlanetFactsModal = () => {
  const selectedPlanetId = useAppSelector(
    (state) => state.planet.selectedPlanetId,
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectedPlanet =
    selectedPlanetId === SUN_ID
      ? SUN_DATA
      : sphereData.find((s) => s.id === selectedPlanetId);

  if (!selectedPlanet) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
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
        ℹ️ Planet Info
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            padding: "20px",
            minWidth: "300px",
            maxWidth: "400px",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {selectedPlanet.title}
            </h3>
            <p
              style={{
                margin: "0",
                lineHeight: "1.4",
                fontSize: "14px",
                color: "#ccc",
              }}
            >
              {selectedPlanet.description}
            </p>
          </div>

          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              🌟 Fun Facts:
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#ddd",
              }}
            >
              {selectedPlanet.facts?.map((fact, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
