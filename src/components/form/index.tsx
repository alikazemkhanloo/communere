import styles from "./form.module.css";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Select from "../shared/form/select";
import { Options } from "react-select";
import InputFile from "../shared/form/input-file";
import Button from "../shared/button";
import { useDispatch, useSelector } from "react-redux";
import { addToLocations, updateLocation } from "../../redux/locations/actions";
import { dataUrlToFile, readFileAsync } from "../../utils";
import { useRouter } from "next/router";
import { State } from "../../redux/rootReducer";

interface Inputs {
  name: string;
  location: { lat: number; lng: number };
  locationType: string;
  logo: File;
}

export interface Option {
  value: string;
  label: string;
}
const defaultValues: Partial<Inputs> = {
  location: { lat: 51.505, lng: -0.09 },
  locationType: undefined,
  logo: undefined,
  name: "",
};

export const options: Options<Option> = [
  { value: "business", label: "Business" },
  { value: "personal", label: "Personal" },
];

interface Props {
  index?: number;
}

const Form: React.FC<Props> = ({ index }) => {
  const locations = useSelector((state: State) => state.locations);
  let values = defaultValues;

  if (typeof index !== "undefined") {
    const location = locations[index];
    values = { ...location, logo: dataUrlToFile(location.logo) };
  }

  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: values,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    const logo = await readFileAsync(data.logo);
    if (typeof index === "undefined") {
      dispatch(addToLocations({ ...data, logo: logo }));
    } else {
      dispatch(updateLocation({ ...data, logo: logo }, index));
    }
    reset(defaultValues);
    router.push("/locations");
  };

  const Map = useMemo(
    () => dynamic(() => import("../shared/form/map-input"), { ssr: false }),
    []
  );

  const onCancel = () => {
    if (typeof index === "undefined") reset(defaultValues);
    else router.back();
  };

  return (
    <main>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.box}>
            <h1>Share Location</h1>
            <div className={styles.formFields}>
              <div>Location name:</div>
              <input
                className={styles.textInput}
                {...register("name", { required: true })}
                type="text"
                name="name"
              />

              <div>Location on map:</div>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Map className={styles.map} {...field} />
                )}
              />

              <div>Location type:</div>
              <Controller
                name="locationType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      value={
                        field.value
                          ? options.find((i) => i.value === field.value)
                          : null
                      }
                      onChange={(value) => field.onChange(value?.value)}
                      options={options}
                    />
                  );
                }}
              />

              <div>Logo:</div>
              <Controller
                name="logo"
                control={control}
                render={({ field }) => <InputFile {...field} />}
              />
            </div>
          </div>
          <div className={styles.buttonRow}>
            <Button
              onClick={onCancel}
              style={{ backgroundColor: "#999" }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Form;
