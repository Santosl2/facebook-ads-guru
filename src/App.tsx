import { useState } from "react";
import "./App.css";
import { useExecuteScript } from "./hooks/useExecuteScript";

function App() {
  const [config, setConfig] = useState({
    removeAds: false,
    removeEmpty: false,
  });

  const onClick = useExecuteScript(() => {
    const itens = document.querySelectorAll(
      "div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div"
    );

    const ads = Array.from(itens).filter(
      (item) => !item.querySelector(".x6s0dn4.x78zum5.xsag5q8")
    );

    ads.forEach((ad) => {
      ad.remove();
    });
  });

  const sortByCreativeCount = useExecuteScript(() => {
    const itens = document.querySelectorAll(
      "div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w > div"
    );

    const ads = Array.from(itens).sort((accItem, prevItem) => {
      const adsCountCurrent = accItem
        .querySelector(".x6s0dn4.x78zum5.xsag5q8 strong")
        ?.innerHTML?.replace(/[^0-9]/g, "");

      const adsCountPrev = prevItem
        .querySelector(".x6s0dn4.x78zum5.xsag5q8 strong")
        ?.innerHTML?.replace(/[^0-9]/g, "");

      if (adsCountCurrent && adsCountPrev) {
        return parseInt(adsCountPrev) - parseInt(adsCountCurrent);
      }

      return 1;
    });

    const root = document.querySelector(
      "#content > div > div:nth-child(1) > div > div.x8bgqxi.x1n2onr6 > div._8n_0 > div:nth-child(2) > div.x1dr75xp.xh8yej3.x16md763 > div.xrvj5dj.xdq2opy.xexx8yu.xbxaen2.x18d9i69.xbbxn1n.xdoe023.xbumo9q.x143o31f.x7sq92a.x1crum5w"
    );
    if (!root) return;

    root.innerHTML = "";
    ads.forEach((ad) => {
      root.appendChild(ad);
    });
  });

  const handleRemoveAds = () => {
    setConfig({ ...config, removeAds: true });
    onClick();
  };

  return (
    <>
      <h1>Add Tools</h1>
      <div className="card">
        <button onClick={handleRemoveAds}>
          Remove all Ads without Creatives
        </button>

        <hr />

        <button onClick={sortByCreativeCount}>Sort by Creative Count</button>
      </div>
    </>
  );
}

export default App;
