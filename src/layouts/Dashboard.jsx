import { useSelector } from "react-redux";
import Home from "../pages/Home";
import { Header, Image, Menu, MenuItem } from "semantic-ui-react";
const Dashboard = () => {
  const vendor = useSelector((state) => state.vendor.currentVendor);
  return (
    <main className="dashboard">
      <Menu borderless color="blue">
        <MenuItem>
          <Image
            style={{
              padding: "10px",
            }}
            size="tiny"
            src={vendor.logo || "../assets/react.svg"}
            alt={`${vendor.name} Logo`}
          />
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
