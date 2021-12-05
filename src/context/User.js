import React from "react";

const UserContext = React.createContext();

export default ({ children }) => {
  const [userData, setUserData] = React.useState({ name: "", email: "" });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  const { userData, setUserData } = context;

  return { userData, setUserData };
};
