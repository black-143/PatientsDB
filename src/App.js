import Sidebar from "./components/SideBar";
import "./App.css";
import { SearchProvider } from "./SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <div className="App">
        <Sidebar />
      </div>
    </SearchProvider>
  );
}
