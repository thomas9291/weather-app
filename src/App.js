import "./App.css";
import Form from "./components/Form/Form";
import { uid } from "uid";

import { useState } from "react";
const initial = [
  { id: "99", name: "walking", isGoodWeatherActivity: true },
  { id: "100", name: "ski", isGoodWeatherActivity: false },
];
const App = () => {
  const [activities, setActivities] = useState(initial);

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([{ name: newActivity, id: uid(), isWeather }, ...activities]);
  };

  console.log(activities);

  return <Form onAddActivity={handleAddActivity} />;
};

export default App;
