/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ADS_COUNT_ELEMENT,
  ADS_CREATIVE_COUNT_ELEMENT,
  ADS_ITENS_SELECTOR,
  ADS_ROOT_ELEMENT,
} from "../constants";
import { useConfigContext } from "../contexts/ConfigContext";
import { useExecuteScript } from "../hooks/useExecuteScript";

interface SortAdsExecuteScriptProps {
  adsCountElement: string;
  adsItensSelector: string;
  adsRootElement: string;
  adsCreativeCountElement: string;
  showAdsWithoutCreatives: boolean;
}
export function SortAdsByCreativeCount() {
  const { config } = useConfigContext();

  const sortByCreativeCount = useExecuteScript<SortAdsExecuteScriptProps>(
    (d) => {
      const {
        adsCountElement,
        adsItensSelector,
        adsRootElement,
        adsCreativeCountElement,
        showAdsWithoutCreatives = false,
      } = d!;

      const removeAds = () => {
        const itens = document.querySelectorAll(adsItensSelector);

        const ads = Array.from(itens).filter(
          (item) => !item.querySelector(adsCreativeCountElement)
        );

        ads.forEach((ad) => ad.remove());
      };

      if (showAdsWithoutCreatives) removeAds();

      const itens = document.querySelectorAll(adsItensSelector);

      const removeStrings = (value?: string) => {
        if (!value) return 0;

        return +value.replace(/[^0-9]/g, "");
      };

      const ads = Array.from(itens).sort((accItem, prevItem) => {
        const adsCountCurrent = removeStrings(
          accItem.querySelector(adsCountElement)?.innerHTML
        );

        const adsCountPrev = removeStrings(
          prevItem.querySelector(adsCountElement)?.innerHTML
        );

        if (adsCountCurrent && adsCountPrev)
          return adsCountPrev - adsCountCurrent;

        return 1;
      });

      const root = document.querySelector(adsRootElement);
      if (!root) return;

      root.innerHTML = "";
      ads.forEach((ad) => root.appendChild(ad));
    },
    [
      {
        adsCountElement: ADS_COUNT_ELEMENT,
        adsItensSelector: ADS_ITENS_SELECTOR,
        adsRootElement: ADS_ROOT_ELEMENT,
        adsCreativeCountElement: ADS_CREATIVE_COUNT_ELEMENT,
        showAdsWithoutCreatives: config.showAdsWithoutCreatives,
      },
    ]
  );

  return <button onClick={sortByCreativeCount}>Sort by Creative Count</button>;
}
