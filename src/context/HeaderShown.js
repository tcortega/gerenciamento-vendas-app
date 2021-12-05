import React from "react";

const HeaderShownContext = React.createContext();

export default ({ children }) => {
  const [headerShown, setHeaderShown] = React.useState(true);

  return (
    <HeaderShownContext.Provider value={{ headerShown, setHeaderShown }}>
      {children}
    </HeaderShownContext.Provider>
  );
};

export const useHeaderShown = () => {
  const context = React.useContext(HeaderShownContext);

  const { headerShown, setHeaderShown } = context;

  return { headerShown, setHeaderShown };
};
