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

  /*   let mooveBackgroundImage;
  if (weather.condition === "🌤️") {
    mooveBackgroundImage = "
      https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNsaWRlJTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60
    ";
  }
  if (weather.condition === "🌨️") {
    mooveBackgroundImage =
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  }
  if (weather.condition === "☀️") {
    mooveBackgroundImage =
      "https://images.unsplash.com/photo-1597316342034-39cb9003f5bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHN1bnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  } else {
    mooveBackgroundImage =
      "https://images.unsplash.com/photo-1544235653-a313b8a430d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHNub3d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
  }
 */
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
      className={classes.container}
      /* style={{
        backgroundImage: mooveBackgroundImage,
      }} */
    >
      <List
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
