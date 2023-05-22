import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import useLocalstorageState from "use-local-storage-state";
import { uid } from "uid";

const initial = [
  { id: "99", name: "walking", isGoodWeatherActivity: true },
  { id: "100", name: "ski", isGoodWeatherActivity: false },
];
const App = () => {
  const [activities, setActivities] = useLocalstorageState("activities", {
    defaultValue: initial,
  });

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([{ name: newActivity, id: uid(), isWeather }, ...activities]);
  };

  console.log(activities);

  return (
    <>
      <List activities={activities} />
      <Form onAddActivity={handleAddActivity} />
    </>
  );
};

export default App;
