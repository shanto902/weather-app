import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "semantic-ui-react";
import { fetchWeather, addToHistory } from "../store/features/weatherSlice";
import { fetchWeatherData } from "../services/weatherAPI";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  const handleSearchChange = async (e, { value }) => {
    setSearchQuery(value);
    if (value.length < 3) return;
    setLoading(true);

    try {
      const response = await fetchWeatherData(value, false);

      const formattedResults = [
        {
          title: `${response.location.name}`,
          description: `${
            response.location.region && `${response.location.region},`
          } ${response.location.country}`,
          image: `https:${response.current?.condition.icon}`,
          price: `${response.current?.temp_c} °C`,
          value: response.location.name,
        },
      ];

      setResults(formattedResults);
    } catch (error) {
      console.error("Error fetching location suggestion:", error);

      setResults([{ title: "No results found", value: null }]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultSelect = (e, { result }) => {
    setSearchQuery(result.title);
    setResults([]);
    dispatch(fetchWeather(result.value)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(addToHistory(action.payload));
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Search
        minCharacters={3}
        fluid
        style={{
          width: "400px",
          borderRadius: "0px",
        }}
        loading={loading}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}
        results={results}
        value={searchQuery}
        placeholder="Search for a location"
      />
    </div>
  );
};

export default SearchBox;
