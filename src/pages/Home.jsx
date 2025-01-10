/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, fetchWeather } from "../store/features/weatherSlice";
import { Loader, Grid, GridColumn, GridRow } from "semantic-ui-react";
import WeatherCard from "../components/WeatherCard";
import SearchBox from "../components/SearchBox";
import MapBackground from "../components/MapBackground";
import styles from "../styles/home.module.scss";
const Home = ({ vendor }) => {
  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather.current);
  const history = useSelector((state) => state.weather.history);
  document.documentElement.style.setProperty("--primary-color", vendor.color);
  console.log(weather);
  // Feature Guard
  const hasFeatures = vendor?.features;
  const HistoryList =
    hasFeatures.historyEnabled === true
      ? React.lazy(() => import("../components/HistoryList"))
      : null;

  const handleSearch = (location) => {
    dispatch(fetchWeather(location));
    if (weather) {
      dispatch(
        addToHistory({
          name: weather.name,
          temperature: weather.temperature,
        })
      );
    }
  };

  if (!hasFeatures) {
    return <div>Vendor configuration is missing or incorrect.</div>;
  }

  return (
    <main style={{ position: "relative", height: "100vh" }}>
      <MapBackground vendor={vendor} location={weather?.location} />
      <div className={styles.homeContainer} color={vendor.color}>
        <SearchBox onSearch={handleSearch} />

        <Grid style={{ marginTop: "10px" }} columns={1}>
          <GridRow verticalAlign="middle">
            <GridColumn
              mobile={
                hasFeatures.historyEnabled && history.length <= 0 ? 16 : 8
              }
              computer={16}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <WeatherCard weather={weather} vendor={vendor} />
              </div>
            </GridColumn>

            {HistoryList && history.length > 0 && (
              <GridColumn mobile={8} computer={16} verticalAlign="top">
                <Suspense fallback={<Loader active inline="centered" />}>
                  <HistoryList history={history} vendor={vendor} />
                </Suspense>
              </GridColumn>
            )}
          </GridRow>
        </Grid>
      </div>
    </main>
  );
};

export default Home;
