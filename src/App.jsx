import { Toaster } from "sonner";
import Dashboard from "./layouts/Dashboard";
import "./styles/theme.scss";
function App() {
  return (
    <div>
      <Dashboard />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
