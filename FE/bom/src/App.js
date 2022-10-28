import RouterConfiguration from "./configs/router";
import PatientDetail from "components/pages/PatientDetail";

function App() {
  return (
    <div className="App">
      <div className="test">
        <PatientDetail />
      </div>
      <RouterConfiguration />
    </div>
  );
}

export default App;
