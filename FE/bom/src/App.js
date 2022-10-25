import { useEffect } from "react";
import RouterConfiguration from "./configs/router";
import { useLocation } from "react-router-dom";

function App() {
  const [width, setWidth] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      {width > 1180 && location.pathname !== "/login" && (
        <div className="App">
          <RouterConfiguration />
        </div>
      )}
      {width <= 1180 ||
        (location.pathname === "/login" && (
          <div className="App">
            <RouterConfiguration />
          </div>
        ))}
    </>
  );
}

export default App;
