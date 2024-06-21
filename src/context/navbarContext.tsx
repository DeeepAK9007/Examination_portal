import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
  } from "react";
  
  const initialState: string = "Dashboard";
  
  export interface NavItemInterface {
    navitem: string;
    setNavItem: Dispatch<SetStateAction<string>>;
  }
  
  type UserProvideProps = {
    children: ReactNode;
  };
  
  export const NavbarContext = createContext<NavItemInterface>({
    navitem: "admin",
    setNavItem: () => {},
  });
  
  export const NavbarContextProvider = ({ children }: UserProvideProps) => {
    const [navitem, setNavItem] = useState<string>(initialState);
  
    return (
      <NavbarContext.Provider value={{ navitem, setNavItem }}>
        {children}
      </NavbarContext.Provider>
    );
  };
  