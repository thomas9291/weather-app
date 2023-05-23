import Form from "./components/Form/Form";
import List from "./components/List/List";
import useLocalstorageState from "use-local-storage-state";
import { uid } from "uid";
import { useEffect, useState } from "react";
import classes from "./App.module.css";

const initial = [
  { id: "99", name: "walking", isGoodWeatherActivity: true },
  { id: "100", name: "ski", isGoodWeatherActivity: false },
];

const App = () => {
  const [activities, setActivities] = useLocalstorageState("activities", {
    defaultValue: initial,
  });
  /* const [activities, setActivities] = useState(initial); */
  const [weather, setWeather] = useState([
    {
      location: "Europe",
      temperature: 24,
      condition: "🌤️",
      isGoodWeather: true,
    },
  ]);

  /*  let mooveBackgroundImage = "";
  if(weather.condition === "🌤️"){
    mooveBackgroundImage = ""
  } */

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([
      { name: newActivity, id: uid(), isGoodWeatherActivity: isWeather },
      ...activities,
    ]);
  };
  let headline = "";

  setActivities(
    activities.filter(
      (element) => element.isGoodWeatherActivity === weather.isGoodWeather
    )
  );
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
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [weather]);

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((element) => element.id !== id));
  };

  return (
    <div
      className={
        classes.container
      } /*  style={{backgroundImage: url(MyBackgroundImage)}} */
    >
      <List
        activities={activities}
        headline={headline}
        weather={weather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
};

export default App;
