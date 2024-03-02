import "./App.css";
import { RemoveAdsWithoutCreative } from "./components/RemoveAdsWithoutCreative";
import { SortAdsByCreativeCount } from "./components/SortAdsByCreativeCount";

function App() {
  return (
    <>
      <h1>Add Tools</h1>
      <div className="card">
        <RemoveAdsWithoutCreative />

        <hr />

        <SortAdsByCreativeCount />
      </div>
    </>
  );
}

export default App;
