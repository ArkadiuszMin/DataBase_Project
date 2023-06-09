import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import "./ReservationForm.Module.css";

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
  desciription: string().optional(),
  imgSrc: string().url("nieprawidłowy adres URL"),
  shelterId: string().optional(),
});

const AddDogFrom = () => {
  const sexOptions = [
    { value: "samiec", label: "samiec" },
    { value: "samica", label: "samica" },
  ];

  const { register, control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { field } = useController({ name: "sex", control });

  const { errors } = formState;

  const handleSelectChange = (option: any) => {
    console.log("clicked");
    field.onChange(option.value);
  };

  const handleSave = (formValues: any) => {
    console.log(formValues);
    // TODO: do something
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
            value={sexOptions.find(({ value }) => value === field.value)}
            onChange={handleSelectChange}
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
          <input className="form-control" {...register("shelter")} />
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

// TODO: sec required
