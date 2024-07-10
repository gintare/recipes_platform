import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/get";

const RecipesForm = () => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      instructions: "",
      timeInMinutes: 0,
      categoryId: 0,
      category: {},
    },
  });

  const formSubmitHandler = (data) => {};

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categor = await getAllCategories();
        console.log(categor);
      } catch (error) {
        setError(error.message);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <form
        className="row g-3 needs-validation register-form mt-2 d-flex flex-column align-items-stretch"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="name" className="form-label">
            Pecipe Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            {...register("name", {
              required: "Recipe name is required",
              validate: (value) =>
                value.trim() !== "" || "Recipe name cannot be empty",
            })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="image" className="form-label">
            Recipe image file
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            aria-label="file example"
            {...register("image")}
          />
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Recipe description here"
            {...register("description", {
              required: "Recipe description is required",
              validate: (value) =>
                value.trim() !== "" || "Recipe description cannot be empty",
            })}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            className="form-control"
            id="instructions"
            placeholder="Recipe instructions here"
            {...register("instructions", {
              required: "Recipe instructions is required",
              validate: (value) =>
                value.trim() !== "" || "Recipe instructions cannot be empty",
            })}
          ></textarea>
          {errors.instructions && (
            <div className="invalid-feedback">
              {errors.instructions.message}
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <button type="submit" className="btn submit-btn w-100">
            Register
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </form>
    </>
  );
};

export default RecipesForm;
