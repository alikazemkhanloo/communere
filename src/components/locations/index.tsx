import dynamic from "next/dynamic";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { Location } from "../../redux/locations/types";
import { State } from "../../redux/rootReducer";
import { options } from "../home";
import Button from "../shared/button";
import styles from "./styles.module.css";

const Map = dynamic(() => import("../shared/form/map-input"), { ssr: false });

const CustomMarker: React.FC<{ location: Location }> = ({ location }) => {
  const { lat, lng } = location.location;
  const type = options.find((option) => option.value === location.locationType);
  const map = useMap();

  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div className={styles.popup}>
          <div className={styles.popupTitle}>Location Details</div>
          <div className={styles.popupContent}>
            <div>Name: {location.name}</div>
            <div>Type: {type?.label}</div>
            <div>
              Logo:
              <img width={50} height={50} src={location.logo} alt="logo" />
            </div>
          </div>
          <div className={styles.popupActions}>
            <Button
              style={{ backgroundColor: "#ecad52" }}
              type="button"
              onClick={() => map.closePopup()}
            >
              Close
            </Button>
            <Button type="button" onClick={() => map.closePopup()}>
              Edit
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const Locations: React.FC = () => {
  const locations = useSelector((state: State) => state.locations);

  return (
    <div>
      <Map
        className={styles.map}
        markers={locations.map((l) => (
          <CustomMarker
            key={`${l.location.lat}-${l.location.lng}`}
            location={l}
          />
        ))}
      />
    </div>
  );
};
export default Locations;
