import classes from "./List.module.css";

import Button from "../Button/Button";

const List = ({ activities, headline, weather, onDeleteActivity }) => {
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
            <Button onClick={() => onDeleteActivity(element.id)}>❌</Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
