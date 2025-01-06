import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, fetchWeather } from "../store/features/weatherSlice";
import {
  Header,
  Image,
  Segment,
  Loader,
  Grid,
  Divider,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.currentVendor);
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
    <main>
      <header
        style={{
          paddingBottom: "10px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          size="small"
          src={vendor.logo || "../assets/react.svg"}
          alt={`${vendor.name} Logo`}
        />
        <Header textAlign="center" as="h1">
          {vendor.name}
        </Header>
      </header>
      <main>
        <Segment>
          <Grid columns={2}>
            <Divider vertical> - </Divider>
            <GridRow verticalAlign="middle">
              {SearchBox && (
                <GridColumn>
                  <Suspense fallback={<Loader active inline="centered" />}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <SearchBox onSearch={handleSearch} />
                      <WeatherCard weather={weather} />
                    </div>
                  </Suspense>
                </GridColumn>
              )}
              {HistoryList && (
                <GridColumn verticalAlign="top">
                  <Suspense fallback={<Loader active inline="centered" />}>
                    <HistoryList history={history} />
                  </Suspense>
                </GridColumn>
              )}
            </GridRow>
          </Grid>
        </Segment>
      </main>
    </main>
  );
};

export default Home;
