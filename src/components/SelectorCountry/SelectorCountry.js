import classes from "./SelectorCountry.module.css";

const SelectorCountry = ({ location, setLocation }) => {
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor="location-select">
        Choose a location:
      </label>

      <select
        value={location}
        name="location"
        id="location-select"
        onChange={(event) => setLocation(event.target.value)}
        className={classes.select}
      >
        <option value="europe">europe</option>
        <option value="arctic">arctic</option>
        <option value="sahara">sahara</option>
        <option value="rainforest">rainforest</option>
      </select>
    </div>
  );
};

export default SelectorCountry;
