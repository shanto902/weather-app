/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Image, Divider } from "semantic-ui-react";
import { fetchWeather } from "../redux/features/weatherSlice";
import styles from "../styles/historyList.module.scss";
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
    <div>
      {history.length === 0 ? (
        <p>No recently viewed locations.</p>
      ) : (
        <div className={styles.historyListContainer}>
          <List celled divided relaxed>
            <Divider className="text" as={"h5"} horizontal>
              History
            </Divider>
            {history.slice(-3).map((location, index) => (
              <List.Item
                key={index}
                className="text"
                onClick={() => handleLocationClick(location)}
                style={{ cursor: "pointer" }}
              >
                <List.Content
                  style={{
                    alignItems: "center",
                    display: "grid",
                    gridTemplateColumns: "80% 20% ",
                  }}
                  verticalAlign="middle"
                >
                  <div>
                    <List.Header className="text">
                      {location.location.name}
                    </List.Header>

                    <List.Description className="text">
                      {location.current.temp_c} °C
                    </List.Description>
                  </div>
                  <Image src={`https:${location?.current?.condition.icon}`} />
                </List.Content>
              </List.Item>
            ))}
          </List>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button compact onClick={handleClearHistory} color={vendor.color}>
              Clear History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
