import classes from "./ContainerApp.module.css";

const ContainerApp = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default ContainerApp;
