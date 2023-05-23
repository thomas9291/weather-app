import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import ContainerApp from "./components/ContainerAp/ContainerApp";
/* import useLocalstorageState from "use-local-storage-state"; */
import { uid } from "uid";
import { useState } from "react";

const initial = [
  { id: "99", name: "walking", isGoodWeatherActivity: true },
  { id: "100", name: "ski", isGoodWeatherActivity: false },
];
const App = () => {
  /*  const [activities, setActivities] = useState("activities", {
    defaultValue: initial,
  }); */
  const [activities, setActivities] = useState(initial);
  const isGoodWeather = false;

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([
      { name: newActivity, id: uid(), isGoodWeatherActivity: isWeather },
      ...activities,
    ]);
  };

  const filterList = activities.filter(
    (element) => element.isGoodWeatherActivity === isGoodWeather
  );
  let headline = "";
  if (isGoodWeather) {
    headline = "The weather is awesome!Go outside and:";
  } else {
    headline = "Bad weather outside!Here's what you can do now:";
  }

  return (
    <ContainerApp>
      <List activities={filterList} headline={headline} />
      <Form onAddActivity={handleAddActivity} />
    </ContainerApp>
  );
};

export default App;
