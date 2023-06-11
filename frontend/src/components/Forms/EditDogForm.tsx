import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddReservationForm.Module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { string, z } from "zod";
import Select from "react-select";

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

interface Props {
  dog: Dog;
  onClick: () => void;
}

const EditDogForm = ({ dog, onClick }: Props) => {
  const [dogUpdateFailed, setDogUpdateFailed] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const sexOptions = [
    { value: "SAMIEC", label: "samiec" },
    { value: "SAMICZKA", label: "samiczka" },
  ];

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
    defaultValues: {
      name: dog.name,
      weight: dog.weight.toString(),
      sex: dog.sex,
      age: dog.age.toString(),
      description: dog.description,
      imgSrc: dog.imgSrc,
      shelterId: dog.shelter.id,
    },
  });

  const { field: sexField } = useController({ name: "sex", control });
  const { field: shelterIdField } = useController({
    name: "shelterId",
    control,
  });

  const { errors } = formState;

  const handleSelectChange = (fieldName: string, option: any) => {
    if (fieldName === "sex") {
      sexField.onChange(option.value);
    } else if (fieldName === "shelterId") {
      shelterIdField.onChange(option.value);
    }
  };

  const handleSave = (formValues: any) => {
    formValues.dogId = dog.id;
    console.log(formValues);

    axios
      .put("http://localhost:8080/dogs/update", formValues)
      .then((response) => {
        setFormSent(true);
      })
      .catch((error) => {
        console.error(error);
        setDogUpdateFailed(true);
      });
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(handleSave)}>
        <h1 className="title">
          {"Edytuj psa " + dog.name + " "}
          <small className="text-secondary faded-text">/{dog.id}</small>
        </h1>

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
            defaultValue={sexOptions.find(({ value }) => value === dog.sex)}
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
            defaultValue={shelterOptions.find(
              ({ value }) => value === dog.shelter.id
            )}
            value={shelterOptions.find(
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
          <button className="btn btn-secondary myButton1" onClick={onClick}>
            powrót do listy psów
          </button>

          <button className="btn btn-secondary myButton1" type="submit">
            edytuj pieska
          </button>
        </div>

        {dogUpdateFailed && (
          <p style={{ color: "red" }}>
            Podczas uaktualniania danych wystąpił błąd.
          </p>
        )}

        {!dogUpdateFailed && formSent && (
          <p style={{ color: "green" }}>
            Pomyślnie zaktualizowano dane pieska.
          </p>
        )}
      </form>
    </>
  );
};

export default EditDogForm;
