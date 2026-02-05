import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setSelectedPlanet } from "../../store/slices/planets/planetSlice";
import { sphereData, SPHERES } from "../../spheres/data";

export const PlanetSelector = () => {
  const selectedPlanetId = useAppSelector(
    (state) => state.planet.selectedPlanetId,
  );
  const SUN_ID = useAppSelector((state) => state.planet.sundId);
  const dispatch = useAppDispatch();
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
        Focus:{" "}
        {selectedPlanetId === SUN_ID
          ? SPHERES.SUN
          : sphereData.find((s) => s.id === selectedPlanetId)?.title ||
            "Sun"}{" "}
        ▼
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
          <button
            key={SUN_ID}
            onClick={() => {
              dispatch(setSelectedPlanet(SUN_ID));
              setIsOpen(false);
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 20px",
              backgroundColor:
                selectedPlanetId === SUN_ID
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
              if (selectedPlanetId !== SUN_ID) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlanetId !== SUN_ID) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {SPHERES.SUN}
          </button>
          {sphereData.map((sphere) => (
            <button
              key={sphere.id}
              onClick={() => {
                dispatch(setSelectedPlanet(sphere.id));
                setIsOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 20px",
                backgroundColor:
                  selectedPlanetId === sphere.id
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
                if (selectedPlanetId !== sphere.id) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlanetId !== sphere.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {sphere.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
