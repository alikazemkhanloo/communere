import ReactSelect, { components } from "react-select";
import { Option } from "../../../home";
import styles from "./styles.module.css";

const Select: ReactSelect = (props) => {
  return (
    <ReactSelect
      styles={{
        container: (provided, state) => ({
          ...provided,
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          backgroundColor: "#c2e2f9",
          borderLeft: "1px solid #8888",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
        control: (provided, state) => ({
          ...provided,
          overflow: "hidden",
          border: "1px solid #8888",
        }),
      }}
      components={{
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <div className={styles.downArrow} />
          </components.DropdownIndicator>
        ),
      }}
      {...props}
    />
  );
};
export default Select;
