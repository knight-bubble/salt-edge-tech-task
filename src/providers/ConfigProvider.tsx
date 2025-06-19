import type { AppConfig } from "@/types/app-config";
import React, { createContext, useEffect, useState } from "react";

export const ConfigContext = createContext<
  | {
      config: AppConfig;
      setConfig: (config: AppConfig) => void;
      updateConfig: (key: string, value: any) => void;
      clearConfig: () => void;
    }
  | undefined
>(undefined);

export const defaultConfig: AppConfig = {
  pagination: {
    defaultPageSize: 20,
    rowPerPageOptions: [5, 10, 20],
  },
  searchDebounceTime: 300,
};

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("config");
      return stored ? JSON.parse(stored) : defaultConfig;
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const clearConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem("config");
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig, updateConfig, clearConfig }}>{children}</ConfigContext.Provider>
  );
};
