import Form from "./components/Form/Form";
import List from "./components/List/List";
import SelectorCountry from "./components/SelectorCountry/SelectorCountry";
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
  const [location, setLocation] = useState("europe");

  const handleAddActivity = (newActivity, isWeather) => {
    setActivities([
      { name: newActivity, id: uid(), isGoodWeatherActivity: isWeather },
      ...activities,
    ]);
  };
  let headline = "";

  const check = activities.filter(
    (element) => element.isGoodWeatherActivity === weather.isGoodWeather
  );
  if (weather.isGoodWeather) {
    headline = "The weather is awesome!Go outside and:";
  } else {
    headline = "Bad weather outside!Here's what you can do now:";
  }
  const date = new Date();
  const actualeDate = date.toLocaleDateString();

  /*  const URL = "https://example-apis.vercel.app/api/weather"; */

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        `https://example-apis.vercel.app/api/weather/${location}`
      );
      const result = await response.json();

      setWeather(result);
      console.log(weather);
    }
    const timer = setInterval(() => {
      startFetching();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [weather, location]);

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((element) => element.id !== id));
  };
  let wetter = "";
  const sunnyurl =
    "https://images.unsplash.com/photo-1534570122623-99e8378a9aa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bW1lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  const cloud =
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60";

  const raining =
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

  const snow =
    "https://images.unsplash.com/photo-1517166357932-d20495eeffd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c25vd2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

  if (weather.condition === "☀️") {
    wetter = sunnyurl;
  } else if (weather.condition === "🌤️") {
    wetter = cloud;
  } else if (weather.condition === "🌨️") {
    wetter = snow;
  } else {
    wetter = raining;
  }

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url(${wetter})` }}
    >
      <SelectorCountry location={location} setLocation={setLocation} />
      <List
        date={actualeDate}
        activities={check}
        headline={headline}
        weather={weather}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
};

export default App;
