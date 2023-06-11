import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddReservationForm.Module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { string, z } from "zod";

const sexOptions = [
  { value: "samiec", label: "samiec" },
  { value: "samiczka", label: "samiczka" },
];

const schema = z.object({
  name: string().min(3, "zbyt krótkie imię"),
  weight: string()
    .transform((val) => parseFloat(val))
    .refine((val) => val !== undefined && !isNaN(val), {
      message: "brak",
    }),
  sex: string(),
  age: string()
    .transform((val) => parseFloat(val))
    .refine((val) => val !== undefined && !isNaN(val), {
      message: "brak",
    }),
  description: string().optional(),
  imgSrc: string().url("nieprawidłowy adres URL"),
  shelterId: string(),
});

const AddDogFrom = () => {
  const [shelterOptions, setShelterOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/shelters/all")
      .then((response) => {
        const options = response.data.map((shelter: Shelter) => ({
          value: shelter.id,
          label: shelter.name,
        }));
        setShelterOptions(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { register, control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { field: sexField } = useController({ name: "sex", control });
  const { field: shelterIdField } = useController({
    name: "shelterId",
    control,
  });

  const { errors } = formState;

  const handleSelectChange = (fieldName: string, option: any) => {
    console.log("selected");
    if (fieldName === "sex") {
      console.log("sex");
      sexField.onChange(option.value);
    } else if (fieldName === "shelterId") {
      console.log("shelter");
      shelterIdField.onChange(option.value);
    }
  };

  const handleSave = (formValues: any) => {
    console.log(formValues);

    axios
      .post("http://localhost:8080/dogs/add", formValues)
      .then((response) => {
        console.log("RESPONSE: " + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(handleSave)}>
        <h1 className="title">Formularz dodania pieska</h1>

        {/* first row */}
        <div className="col-md-3">
          <label className="form-label">imię:</label>
          <input className="form-control" {...register("name")} />
          <div className="error-message">
            {errors.name?.message?.toString()}
          </div>
        </div>

        <div className="col-md-2">
          <label className="form-label">płeć:</label>
          <Select
            value={sexOptions.find(({ value }) => value === sexField.value)}
            onChange={(option) => handleSelectChange("sex", option)}
            options={sexOptions}
          />
          <div className="error-message">{errors.sex?.message?.toString()}</div>
        </div>

        <div className="col-md-1">
          <label className="form-label">waga:</label>
          <div className="input-group">
            <input
              className="form-control"
              {...register("weight")}
              type="number"
            />
          </div>
          <div className="error-message">
            {errors.weight?.message?.toString()}
          </div>
        </div>

        <div className="col-md-1">
          <label className="form-label">wiek:</label>
          <div className="input-group">
            <input
              className="form-control"
              {...register("age")}
              type="number"
            />
          </div>
          <div className="error-message">{errors.age?.message?.toString()}</div>
        </div>

        <div className="col-md-3">
          <label className="form-label">schronisko:</label>
          <Select
            value={sexOptions.find(
              ({ value }) => value === shelterIdField.value
            )}
            onChange={(option) => handleSelectChange("shelterId", option)}
            options={shelterOptions}
          />
          <div className="error-message">
            {errors.shelterId?.message?.toString()}
          </div>
        </div>

        {/* second row */}
        <div className="col-md-10">
          <label className="form-label">link do zdjęcia:</label>
          <input className="form-control" {...register("imgSrc")} />
          <div className="error-message">
            {errors.imgSrc?.message?.toString()}
          </div>
        </div>

        {/* third row */}
        <div className="col-md-10">
          <label className="form-label">opis*:</label>
          <textarea
            className="form-control"
            {...register("description")}
            rows={3}
          />
        </div>

        <label className="form-label">* - pole jest opcjonalne.</label>

        <div className="col-12">
          <button className="btn btn-secondary myButton1" type="submit">
            dodaj pieska
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDogFrom;
