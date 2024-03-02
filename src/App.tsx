import "./App.css";
import { RemoveAdsWithoutCreative } from "./components/RemoveAdsWithoutCreative";
import { SortAdsByCreativeCount } from "./components/SortAdsByCreativeCount";
import { useConfigContext } from "./contexts/ConfigContext";

function App() {
  const { config } = useConfigContext();

  return (
    <>
      <h1>Add Tools</h1>
      <div className="card">
        <p>
          Remove ads without creative: {String(config.showAdsWithoutCreatives)}
        </p>
        <p>Sort ads by creative count: {String(config.orderByCreativeCount)}</p>
        <RemoveAdsWithoutCreative />

        <SortAdsByCreativeCount />
      </div>
    </>
  );
}

export default App;
