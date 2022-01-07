import styles from "./home.module.css";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import dynamic from "next/dynamic";
interface Inputs {
  name: string;
  location: { lat: number; lng: number };
  locationType: string;
  Logo: string;
}

const defaultValues: Partial<Inputs> = {
  location: { lat: 51.505, lng: -0.09 },
};

const Home: React.FC = () => {
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues,
  });
  const onSubmit = (data: any) => {
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
          <Controller
            name="location"
            control={control}
            render={({ field }) => <Map className={styles.map} {...field} />}
          />
          <input type="submit" value="submit form" />
          {/* <label>
            Location on map:
            <MapInput {...register({ required: true })} name="location" />
          </label> */}
        </form>
      </div>
    </main>
  );
};
export default Home;
