/* eslint-disable react/prop-types */
import { Card } from "semantic-ui-react";
import styles from "../styles/home.module.scss";
const WeatherCard = ({ weather, vendor }) => {
  if (!weather) {
    return (
      <p
        className="text"
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
          backgroundImage: !isDay ? "url(./night.jpg)" : "url(./day.jpg)",
          backgroundPositionY: !isDay ? "-30px" : "-10px",
        }}
        className={styles.cardBgImg}
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
