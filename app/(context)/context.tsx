import { createContext, useContext } from "react";

interface IAppContextProps {}

const AppContext = createContext<IAppContextProps>({});

interface IAppContextProviderProps {
  children?: any;
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = (props) => {
  return (
    <AppContext.Provider value={{}}>{props?.children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext)
}