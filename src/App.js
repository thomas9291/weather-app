import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import ContainerApp from "./components/ContainerAp/ContainerApp";
/* import useLocalstorageState from "use-local-storage-state"; */
import { uid } from "uid";
import { useEffect, useState } from "react";

const initial = [
  { id: "99", name: "walking", isGoodWeatherActivity: true },
  { id: "100", name: "ski", isGoodWeatherActivity: false },
];

const App = () => {
  /*  const [activities, setActivities] = useState("activities", {
    defaultValue: initial,
  }); */
  const [activities, setActivities] = useState(initial);
  const [weather, setWeather] = useState([
    {
      location: "Europe",
      temperature: 24,
      condition: "🌤️",
      isGoodWeather: true,
    },
  ]);

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([
      { name: newActivity, id: uid(), isGoodWeatherActivity: isWeather },
      ...activities,
    ]);
  };

  const filterList = activities.filter(
    (element) => element.isGoodWeatherActivity === weather.isGoodWeather
  );
  let headline = "";
  if (weather.isGoodWeather) {
    headline = "The weather is awesome!Go outside and:";
  } else {
    headline = "Bad weather outside!Here's what you can do now:";
  }

  /*  const URL = "https://example-apis.vercel.app/api/weather"; */

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const result = await response.json();

      setWeather(result);
      console.log(weather);
    }
    const timer = setInterval(() => {
      startFetching();
    }, 50000);
    return () => {
      clearInterval(timer);
    };
  }, [weather]);

  return (
    <ContainerApp>
      <List activities={filterList} headline={headline} weather={weather} />
      <Form onAddActivity={handleAddActivity} />
    </ContainerApp>
  );
};

export default App;
