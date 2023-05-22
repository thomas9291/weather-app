import classes from "./List.module.css";

const List = ({ activities }) => {
  return (
    <ul className={classes.liContainer}>
      {activities.map((element) => (
        <li key={element.id} className={classes.listItem}>
          {element.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
