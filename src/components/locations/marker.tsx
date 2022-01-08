import { useRouter } from "next/router";
import { Marker, Popup, useMap } from "react-leaflet";
import { Location } from "../../redux/locations/types";

import { options } from "../form";
import Button from "../shared/button";
import styles from "./styles.module.css";

interface Props {
  location: Location;
  index: number;
}

const CustomMarker: React.FC<Props> = ({ location, index }) => {
  const { lat, lng } = location.location;
  const type = options.find((option) => option.value === location.locationType);
  const map = useMap();
  const router = useRouter();

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
            <Button
              type="button"
              onClick={() => router.push(`/locations/${index}`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
export default CustomMarker;
