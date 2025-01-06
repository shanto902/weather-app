/* eslint-disable react/prop-types */
import { Card, Image } from "semantic-ui-react";
import dayImage from "../assets/day.png";
import nightImage from "../assets/night.png";

const WeatherCard = ({ weather, vendor }) => {
  if (!weather) {
    return (
      <p
        style={{
          margin: "15px 0",
          textAlign: "center",
        }}
      >
        Please search for a location to see the weather details.
      </p>
    );
  }

  const { location, current } = weather;

  const isDay = current.is_day;

  return (
    <Card color={vendor.color}>
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
