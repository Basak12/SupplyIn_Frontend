import NavigationContext from "../context/Navigation";
import { useContext } from "react";

const UseNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("UseNavigation must be used within a NavigationProvider");
  }
  return context;
};

export default UseNavigation;
