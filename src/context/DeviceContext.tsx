import React, { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const BREAKPOINTS = {
  mobile: 600,
  tablet: 1024,
};

type DeviceType = "mobile" | "tablet" | "desktop";

export const useDeviceType = () => useContext(DeviceContext);

export const DeviceContext = createContext<DeviceType>("desktop");

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  const detectDevice = () => {
    const width = document.documentElement.clientWidth;
    console.log(width);
    if (width <= BREAKPOINTS.mobile) {
      setDeviceType("mobile");
    } else if (width <= BREAKPOINTS.tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  };

  useEffect(() => {
    detectDevice();
    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
    };
  }, []);

  useEffect(() => {
    // Dynamically add the class to the html element
    document.documentElement.classList.remove("mobile", "tablet", "desktop");
    document.documentElement.classList.add(deviceType);
  }, [deviceType]);
  return (
    <DeviceContext.Provider value={deviceType}>
      {children}
    </DeviceContext.Provider>
  );
};
