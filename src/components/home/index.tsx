import styles from "./home.module.css";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Select from "../shared/form/select";
import { Options } from "react-select";
import InputFile from "../shared/form/input-file";

interface Inputs {
  name: string;
  location: { lat: number; lng: number };
  locationType: string;
  logo: File;
}

interface Option {
  value: string;
  label: string;
}
const defaultValues: Partial<Inputs> = {
  location: { lat: 51.505, lng: -0.09 },
};

const options: Options<Option> = [
  { value: "business", label: "Business" },
  { value: "personal", label: "Personal" },
];

const Home: React.FC = () => {
  const { register, handleSubmit, control } = useForm<Inputs>({
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
  return (
    <main>
      <div className={styles.container}>
        <h1>Share Location</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Location name:
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
            />
          </label>
          <label>
            Location on map:
            <Controller
              name="location"
              control={control}
              render={({ field }) => <Map className={styles.map} {...field} />}
            />
          </label>
          <Controller
            name="locationType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  value={options.find((i) => i.value === field.value)}
                  onChange={(value) => field.onChange(value?.value)}
                  options={options}
                />
              );
            }}
          />
          <div>
            Logo:
            <Controller
              name="logo"
              control={control}
              render={({ field }) => <InputFile {...field} />}
            />
          </div>
          <input type="submit" value="submit form" />
        </form>
      </div>
    </main>
  );
};
export default Home;
