"use client";
import React from "react";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface RouteMapProps {
  route: any;
  bins: {
    binId: string;
    location: {
      lat: number;
      lon: number;
      address?: string;
    };
  }[];
}

// Helper to force exactly 2 elements tuple for Leaflet coords
function toLatLngTuple(arr: any): [number, number] {
  return [arr[0], arr[1]];
}

// Component to fit map bounds on coordinates
const FitBounds = ({ bounds }: { bounds: L.LatLngBoundsExpression }) => {
  const map = useMap();

  // Fit bounds on mount or when bounds change
  React.useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};

const RouteMap = ({ route, bins }: RouteMapProps) => {
  const jobSteps = route.steps.filter((step: any) => step.type === "job");

  const coords: [number, number][] = jobSteps.map((step: any) => {
    const job = bins[step.id - 1];
    return [job.location.lat, job.location.lon];
  });

  const officeStart = route.steps.find((s: any) => s.type === "start");
  const officeEnd = route.steps.find((s: any) => s.type === "end");

  const officeStartCoord: [number, number] = officeStart
    ? toLatLngTuple([officeStart.location[1], officeStart.location[0]])
    : [6.52, 3.375];

  const officeEndCoord: [number, number] = officeEnd
    ? toLatLngTuple([officeEnd.location[1], officeEnd.location[0]])
    : officeStartCoord;

  // Polyline points (start -> jobs -> end)
  const polylinePoints: [number, number][] = [
    officeStartCoord,
    ...coords,
    officeEndCoord,
  ];

  // Create LatLngBounds from all points to fit map view
  const bounds = L.latLngBounds(polylinePoints);

  // Icons
  const startIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  const endIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828778.png",
    iconSize: [30, 30],
  });

  const numberedIcon = (number: number): L.DivIcon => {
    return new L.DivIcon({
      html: `<div style="background-color:#1976d2;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-weight:bold">${number}</div>`,
      className: "",
      iconSize: [30, 30],
    });
  };

  return (
    <MapContainer
      center={officeStartCoord} // initial center (will be overridden by fitBounds)
      zoom={13} // initial zoom (will be overridden)
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Fit map to all markers */}
      <FitBounds bounds={bounds} />

      {/* Route polyline */}
      <Polyline positions={polylinePoints} color="blue" />

      {/* Start marker */}
      <Marker position={officeStartCoord} icon={startIcon}>
        <Popup>Start Point (Office)</Popup>
      </Marker>

      {/* End marker */}
      <Marker position={officeEndCoord} icon={endIcon}>
        <Popup>End Point (Office)</Popup>
      </Marker>

      {/* Step markers for bins */}
      {jobSteps.map((step: any, index: number) => {
        const bin = bins[step.id - 1];
        return (
          <Marker
            key={index}
            position={[bin.location.lat, bin.location.lon]}
            icon={numberedIcon(index + 1)}
          >
            <Popup>
              <strong>Step {index + 1}</strong>
              <br />
              Bin ID: {bin.binId}
              <br />
              {bin.location.address || `${bin.location.lat}, ${bin.location.lon}`}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default RouteMap;
