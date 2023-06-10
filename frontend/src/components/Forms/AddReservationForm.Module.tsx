import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

import "./AddReservationForm.Module.css";
import axios from "axios";

const schema = z.object({
  firstName: string().min(3, "zbyt krótkie imię"),
  secondName: string().min(3, "zbyt krótkie nazwisko"),
  email: string().email("błędny email"),
  phone: string().length(9, "błędna długość"),
  city: string().min(3, "zbyt krótka nazwa miasta"),
  postalCode: string().min(1, "błędny kod"),
  street: string().min(3, "zbyt krótka nazwa ulicy"),
});

interface Props {
  dogId: string;
}

const From = ({ dogId }: Props) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleSave = (formValues: any) => {
    formValues.dogId = dogId;

    console.log(formValues);

    // axios
    //   .post("http://localhost:8080/adoptions/add", formValues)
    //   .then((response) => {
    //     console.log("RESPONSE: " + response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit(handleSave)}>
        <h1 className="title">Formularz rezerwacji</h1>

        {/* first row */}
        <div className="col-md-6">
          <label className="form-label">imię:</label>
          <input className="form-control" {...register("firstName")} />
          <div className="error-message">
            {errors.firstName?.message?.toString()}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">nazwisko:</label>
          <input className="form-control" {...register("secondName")} />
          <div className="error-message">
            {errors.secondName?.message?.toString()}
          </div>
        </div>

        {/* second row */}
        <div className="col-md-3">
          <label className="form-label">nr telefonu:</label>
          <div className="input-group">
            <span className="input-group-text">☎️</span>
            <input className="form-control" {...register("phone")} />
          </div>
          <div className="error-message">
            {errors.phone?.message?.toString()}
          </div>
        </div>

        <div className="col-md-9">
          <label className="form-label">email:</label>
          <div className="input-group">
            <span className="input-group-text">📪</span>
            <input className="form-control" {...register("email")} />
          </div>
          <div className="error-message">
            {errors.email?.message?.toString()}
          </div>
        </div>

        {/* third row */}
        <div className="col-md-2">
          <label className="form-label">kod pocztowy:</label>
          <input className="form-control" {...register("postalCode")} />
          <div className="error-message">
            {errors.postalCode?.message?.toString()}
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label">miasto:</label>
          <input className="form-control" {...register("city")} />
          <div className="error-message">
            {errors.city?.message?.toString()}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">ulica:</label>
          <input className="form-control" {...register("street")} />
          <div className="error-message">
            {errors.street?.message?.toString()}
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-secondary myButton" type="submit">
            wyślij formularz rezerwacyjny
          </button>
        </div>

        <div className="position-absolute bottom-0 align-right">
          <p style={{ float: "right" }}>
            Tylko krok dzieli cię od powiększenia swojej rodziny!
          </p>
        </div>
      </form>
    </>
  );
};

export default From;
