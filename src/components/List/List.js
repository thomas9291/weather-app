import classes from "./List.module.css";

const List = ({ activities, headline }) => {
  return (
    <>
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
