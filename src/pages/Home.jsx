/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, fetchWeather } from "../store/features/weatherSlice";
import { Segment, Loader, Grid, GridColumn, GridRow } from "semantic-ui-react";
import WeatherCard from "../components/WeatherCard";
import SearchBox from "../components/SearchBox";
const Home = ({ vendor }) => {
  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather.current);
  const history = useSelector((state) => state.weather.history);

  // Feature Guard
  const hasFeatures = vendor?.features;
  const HistoryList =
    import.meta.env.VITE_FEATURE_FLAG === true
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
    <main className="main-scss" style={{ backgroundColor: vendor.color }}>
      <Segment raised color={vendor.color}>
        <SearchBox onSearch={handleSearch} />

        <Grid
          doubling
          style={{ marginTop: "10px" }}
          columns={
            hasFeatures.historyEnabled === false ? 1 : history <= 0 ? 1 : 2
          }
        >
          <GridRow verticalAlign="middle">
            <GridColumn>
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
              <GridColumn verticalAlign="top">
                <Suspense fallback={<Loader active inline="centered" />}>
                  <HistoryList history={history} vendor={vendor} />
                </Suspense>
              </GridColumn>
            )}
          </GridRow>
        </Grid>
      </Segment>
    </main>
  );
};

export default Home;
