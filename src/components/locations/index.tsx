import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { State } from "../../redux/rootReducer";
import CustomMarker from "./marker";
import styles from "./styles.module.css";

const Map = dynamic(() => import("../shared/form/map-input"), { ssr: false });

const Locations: React.FC = () => {
  const locations = useSelector((state: State) => state.locations);

  return (
    <div>
      <Map
        className={styles.map}
        markers={locations.map((l, index) => (
          <CustomMarker
            key={`${l.location.lat}-${l.location.lng}`}
            location={l}
            index={index}
          />
        ))}
      />
    </div>
  );
};
export default Locations;
