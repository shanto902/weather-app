import Home from "../pages/Home";
import { Header, Image, Menu, MenuItem } from "semantic-ui-react";
import vendors from "../config/vendors";
const Dashboard = () => {
  const vendor = vendors.vendor1;
  return (
    <main className="dashboard">
      <Menu tabular attached borderless>
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
