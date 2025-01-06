import { useSelector } from "react-redux";
import { Card, Image } from "semantic-ui-react";
import dayImage from "../assets/day.png"; // Replace with the path to your day image
import nightImage from "../assets/night.png"; // Replace with the path to your night image
import "./WeatherCard.scss";
const WeatherCard = () => {
  const weather = useSelector((state) => state.weather.current);

  if (!weather) {
    return (
      <p
        style={{
          marginTop: "10px",
        }}
      >
        Please search for a location to see the weather details.
      </p>
    );
  }

  const { location, current } = weather;

  const isDay = current.is_day;

  return (
    <Card>
      <Image
        style={{ padding: "20px" }}
        src={isDay ? dayImage : nightImage}
        ui={false}
        alt={isDay ? "Day" : "Night"}
      />
      <Card.Content>
        <Card.Header>
          {location.name}, {location.country}
        </Card.Header>
        <Card.Meta>{current.temp_c}°C</Card.Meta>
        <Card.Description>{current?.condition?.text}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;
