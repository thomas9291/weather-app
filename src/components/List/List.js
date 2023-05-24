import classes from "./List.module.css";

import Button from "../Button/Button";

const List = ({ activities, headline, weather, onDeleteActivity, date }) => {
  return (
    <>
      <h1 className={classes.h1}>
        <span className={classes.span}>{weather.condition}</span>
        <span className={classes.span}>{weather.temperature}</span>
        <span className={classes.date}>{date}</span>
      </h1>
      <h3 className={classes.title}>{headline}</h3>
      <ul className={classes.liContainer}>
        {activities.map((element) => (
          <li key={element.id} className={classes.listItem}>
            {element.name}
            <Button
              onClick={() => onDeleteActivity(element.id)}
              className={classes.btn}
            >
              ❌
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
