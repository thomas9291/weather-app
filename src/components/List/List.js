import classes from "./List.module.css";

const List = ({ activities, headline, weather }) => {
  return (
    <>
      <h1 className={classes.h1}>
        <span className={classes.span}>{weather.condition}</span>
        <span className={classes.span}>{weather.temperature}</span>
      </h1>
      <h3 className={classes.title}>{headline}</h3>
      <ul className={classes.liContainer}>
        {activities.map((element) => (
          <li key={element.id} className={classes.listItem}>
            {element.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
