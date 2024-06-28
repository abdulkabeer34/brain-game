import React, { createContext , useContext } from "react";
import store from "./HistoryStore";


const StoreContext =createContext(store);


export const StoreProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
}


const useStore =  () => useContext(StoreContext)
export default useStore;