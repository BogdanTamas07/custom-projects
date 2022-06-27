import mock from "./__mocks__/index.json";
import List from "./components/List";
import "./App.css";

function App() {
  const { groups } = mock;
  
  return (
    <div className="App">
      <List groups={groups}></List>
    </div>
  );
}

export default App;
 