import { ConfigContext } from "@/providers/ConfigProvider";
import { useContext } from "react";

export const useAppConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("ConfigContext not found");
  }
  return context;
};
