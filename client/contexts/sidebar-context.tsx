import React, {createContext, useState, useContext} from 'react';

type Context = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const SidebarContext = createContext<Context | undefined>(undefined);

export const SidebarContextProvider: React.FC = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  // eslint-disable-next-line react/display-name
  const value: Context = React.useMemo(
    () => [isSidebarOpen, setIsSidebarOpen],
    [isSidebarOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = (): Context => {
  // The useContext function accepts a Context object and returns the current context value. When the provider updates, this Hook will trigger a re-render with the latest context value.
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContextProvider'
    );
  }

  return context;
};
