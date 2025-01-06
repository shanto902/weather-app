/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, fetchWeather } from "../store/features/weatherSlice";
import { Segment, Loader, Grid, GridColumn, GridRow } from "semantic-ui-react";
import WeatherCard from "../components/weatherCard";

const Home = ({ vendor }) => {
  const dispatch = useDispatch();

  const weather = useSelector((state) => state.weather.current);
  const history = useSelector((state) => state.weather.history);

  // Feature Guard
  const hasFeatures = vendor?.features;

  // Using LazyLoad to make smaller size app
  const SearchBox = hasFeatures?.searchEnabled
    ? React.lazy(() => import("../components/SearchBox"))
    : null;

  const HistoryList = hasFeatures?.historyEnabled
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
    <main
      style={{
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Segment b color={vendor.color}>
        <Suspense fallback={<Loader active inline="centered" />}>
          <SearchBox onSearch={handleSearch} />
        </Suspense>
        <Grid
          doubling
          style={{ marginTop: "10px" }}
          columns={history <= 0 ? 1 : 2}
        >
          <GridRow verticalAlign="middle">
            {SearchBox && (
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
            )}
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
