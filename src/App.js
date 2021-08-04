import { hot } from "react-hot-loader";
import "./App.scss";

const App = () => {

  return (
    <div className="App">
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        <h1>React + Webpack Template</h1>
      </div>
    </div>
  )
};

export default hot(module)(App);