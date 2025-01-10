/* eslint-disable react/prop-types */
import { Card } from "semantic-ui-react";

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
          backgroundColor: "red",
          backgroundImage: !isDay ? "url(./night.jpg)" : "url(./day.jpg)",
          backgroundSize: "cover",
          backgroundPositionY: "-10px",
          backgroundPositionX: !isDay ? "-55px" : "0px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "20px",
          padding: "10px",
        }}
      >
        <Card.Content style={{ color: !isDay ? "white" : "" }}>
          <Card.Header textAlign="right" as={"h5"} style={{ margin: 0 }}>
            {location.name}, {location.country}
          </Card.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <div>
              <Card.Meta
                textAlign="right"
                style={{ margin: 0, color: !isDay ? "white" : "black" }}
                as={"h5"}
              >
                {current.temp_c}°C
              </Card.Meta>
              <Card.Description textAlign="right">
                {current?.condition?.text}
              </Card.Description>
            </div>
          </div>
        </Card.Content>
      </div>
    </Card>
  );
};

export default WeatherCard;
