import styles from "./home.module.css";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Select from "../shared/form/select";
import { Options } from "react-select";
import InputFile from "../shared/form/input-file";
import Button from "../shared/button";

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

const options: Options<Option> = [
  { value: "business", label: "Business" },
  { value: "personal", label: "Personal" },
];

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit = (data: any) => {
    // const url = window.URL.createObjectURL(data.logo);
    console.log(data);
  };
  const Map = useMemo(
    () => dynamic(() => import("../shared/form/map-input"), { ssr: false }),
    []
  );

  const onCancel = () => {
    reset(defaultValues);
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
                  console.log(field.value);

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
export default Home;
