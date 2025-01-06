/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Header, Image } from "semantic-ui-react";
import { fetchWeather } from "../store/features/weatherSlice";

const HistoryList = ({ vendor }) => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.weather.history);

  const handleLocationClick = (location) => {
    dispatch(fetchWeather(location.location.name));
  };

  const handleClearHistory = () => {
    dispatch({ type: "weather/clearHistory" });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Header textAlign="center" color={vendor.color} as="h3">
        Last Viewed Locations
      </Header>

      {history.length === 0 ? (
        <p>No recently viewed locations.</p>
      ) : (
        <>
          <List celled divided relaxed>
            {history.slice(-3).map((location, index) => (
              <List.Item
                key={index}
                onClick={() => handleLocationClick(location)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  id="history-img"
                  size="mini"
                  src={`https:${location?.current?.condition.icon}`}
                />
                <List.Content>
                  <List.Header>{location.location.name}</List.Header>
                  <List.Description>
                    {location.location.region
                      ? `${location.location.region}, `
                      : ""}
                    {location.location.country}
                  </List.Description>

                  <List.Description>
                    {location.current.temp_c} °C
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <Button
            onClick={handleClearHistory}
            color={vendor.color}
            style={{ marginBottom: "10px" }}
            fluid
          >
            Clear History
          </Button>
        </>
      )}
    </div>
  );
};

export default HistoryList;
