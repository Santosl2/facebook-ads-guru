import { ADS_CREATIVE_COUNT_ELEMENT, ADS_ITENS_SELECTOR } from "../constants";
import { useConfigContext } from "../contexts/ConfigContext";
import { useExecuteScript } from "../hooks/useExecuteScript";

interface RemoveAdsExecuteScriptProps {
  adsItensSelector: string;
  adsCreativeCountElement: string;
}

export function RemoveAdsWithoutCreative() {
  const { setConfig } = useConfigContext();

  const handleRemoveAds = useExecuteScript<RemoveAdsExecuteScriptProps>(
    (d) => {
      const { adsItensSelector, adsCreativeCountElement } = d!;

      const itens = document.querySelectorAll(adsItensSelector);

      const ads = Array.from(itens).filter(
        (item) => !item.querySelector(adsCreativeCountElement)
      );

      ads.forEach((ad) => ad.remove());
    },
    [
      {
        adsItensSelector: ADS_ITENS_SELECTOR,
        adsCreativeCountElement: ADS_CREATIVE_COUNT_ELEMENT,
      },
    ]
  );

  const onClickToRemoveAds = () => {
    setConfig((prev) => ({
      ...prev,
      showAdsWithoutCreatives: !prev.showAdsWithoutCreatives,
    }));

    handleRemoveAds();
  };

  return (
    <button onClick={onClickToRemoveAds}>
      Remove all Ads without Creatives
    </button>
  );
}
