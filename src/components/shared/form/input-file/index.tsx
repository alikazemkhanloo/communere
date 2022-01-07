import Image from "next/image";
import styles from "./styles.module.css";
import Icon from "./upload.svg";
interface Props {
  name: string;
  onChange: any;
  value: { name: string };
}
const InputFile: React.FC<Props> = (props) => {
  return (
    <label>
      <div className={styles.container}>
        <div className={styles.title}>{props.value?.name || "Upload"}</div>
        <div className={styles.iconContainer}>
          <Icon />
        </div>
      </div>
      <input
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => props.onChange(e.target.files?.[0])}
        className={styles.input}
        type="file"
      />
    </label>
  );
};
export default InputFile;
