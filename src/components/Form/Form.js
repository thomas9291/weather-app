import classes from "./Form.module.css";

const Form = ({ onAddActivity }) => {
  const handlesubmit = (event) => {
    event.preventDefault();
    let isWeather = false;
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data.isGoodWeatherActivity === "on") {
      isWeather = true;
    }
    onAddActivity(data.name, isWeather);
    event.target.reset();
    event.target.elements.name.focus();
  };

  return (
    <>
      <form onSubmit={handlesubmit} className={classes.formContainer}>
        <fieldset className={classes.fieldset}>
          <legend className={classes.header}>Add new Activity:</legend>
          <div>
            <label className={classes.label} htmlFor="name">
              Name:
            </label>
            <input
              className={classes.input}
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <br />
          <div>
            <label className={classes.label} htmlFor="isGoodWeatherActivity">
              Good-weather activity
            </label>
            <input
              className={classes.input}
              type="checkbox"
              id="isGoodWeatherActivity"
              name="isGoodWeatherActivity"
            />
          </div>
          <button className={classes.btn} type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Form;
