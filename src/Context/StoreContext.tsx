import { createContext, useState, ReactNode, useContext } from "react";
type stateType = string;
type toggleModeType = () => void;
interface StoreContextType {
  mode: stateType;
  toggleMode: toggleModeType;
}
const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProp {
  children: ReactNode;
}

export const useStoreContext = () => {
  return useContext(StoreContext) as StoreContextType;
};

export const StoreContextProvider = ({
  children,
}: StoreContextProviderProp) => {
  const [mode, setMode] = useState("light");

  const toggleMode: toggleModeType = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <StoreContext.Provider value={{ mode, toggleMode }}>
      {children}
    </StoreContext.Provider>
  );
};
