import Home from "../pages/Home";
import { Header, Image, Menu, MenuItem } from "semantic-ui-react";
import vendors from "../config/vendors";

import { useSelector } from "react-redux";
const Dashboard = () => {
  const vendor = vendors.vendor1;
  document.documentElement.style.setProperty("--primary-color", vendor.color);
  const weather = useSelector((state) => state?.weather?.current);
  const isDay = weather?.current?.is_day;

  return (
    <main className={`dashboard ${!isDay ? `night` : `day`}`}>
      <Menu inverted={!isDay ? true : false} compact attached>
        <MenuItem>
          <Image
            style={{
              padding: "10px",
            }}
            size="tiny"
            src={vendor.logo || "../assets/react.svg"}
            alt={`${vendor.name} Logo`}
          />
        </MenuItem>
        <MenuItem>
          <Header color={vendor.color} style={{ margin: "0px" }} as="h1">
            {vendor.name}
          </Header>
        </MenuItem>
      </Menu>
      <Home vendor={vendor} />
    </main>
  );
};

export default Dashboard;
