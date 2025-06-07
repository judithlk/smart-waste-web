import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FitBounds = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};
