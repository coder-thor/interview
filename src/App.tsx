// dependencies
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// routes
import { ComponentBasedRoutes as Routes } from './router';

// components
import SearchBar from "./components/SearchBar";

// store
import store from "./store";

// hooks
import useConvenientRouter from "./hooks/useConvenientRouter";

function App() {
  const {
    pathname
  } = useConvenientRouter();

  // 要给search bar显示的标题栏文案
  const searchBarTitle = useMemo<{
    boldTitle: string;
    regularTitle: string
  }>(() => {
    if (pathname === "/") return {
      boldTitle: "Simply",
      regularTitle: "Trends"
    }
    return {
      boldTitle: "Best",
      regularTitle: "search"
    }
  }, [pathname])

  return (
    <Provider store={ store }>
      <div className="App">
        <SearchBar { ...searchBarTitle } />
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
