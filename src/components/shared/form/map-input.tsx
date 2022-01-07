import { MapConsumer, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { LeafletMouseEvent } from "leaflet";

interface LatLng {
  lat: number;
  lng: number;
}
interface Props {
  className?: string;
  value?: LatLng;
  onChange?(value: LatLng): void;
  markers?: any;
}

const MapInput: React.FC<Props> = ({ className, value, onChange, markers }) => {
  // fix default marker icon
  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrl.src,
      shadowUrl: shadowUrl.src,
    });
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className={className}
    >
      <MapConsumer>
        {(map) => {
          map.on("click", (e: LeafletMouseEvent) => {
            const location = e.latlng;
            if (location) {
              onChange?.(location);
            }
          });
          return null;
        }}
      </MapConsumer>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {value && <Marker position={value || [51.505, -0.09]} />}
      {markers}
    </MapContainer>
  );
};

export default MapInput;
