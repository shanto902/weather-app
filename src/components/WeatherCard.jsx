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
    <Card centered raised color={vendor.color}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "20px",
          padding: "10px",
        }}
      >
        <Image
          src={isDay ? dayImage : nightImage}
          alt={isDay ? "Day" : "Night"}
          size="tiny"
        />

        <Card.Content>
          <Card.Header textAlign="right" as={"h5"} style={{ margin: 0 }}>
            {location.name}, {location.country}
          </Card.Header>
          <Card.Meta textAlign="right" style={{ margin: 0 }} as={"h5"}>
            {current.temp_c}°C
          </Card.Meta>
          <Card.Description textAlign="right">
            {current?.condition?.text}
          </Card.Description>
        </Card.Content>
      </div>
    </Card>
  );
};

export default WeatherCard;
