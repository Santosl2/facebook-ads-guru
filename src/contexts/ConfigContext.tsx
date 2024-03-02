import { createContext, useContext, useState } from "react";

const defaultConfig = {
  showAdsWithoutCreatives: false,
  orderByCreativeCount: false,
};

interface ConfigContextType {
  config: typeof defaultConfig;
  setConfig: React.Dispatch<React.SetStateAction<typeof defaultConfig>>;
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => {},
});

function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

function useConfigContext() {
  const ctx = useContext(ConfigContext);

  if (!ctx) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return ctx;
}

export { ConfigProvider, useConfigContext };
