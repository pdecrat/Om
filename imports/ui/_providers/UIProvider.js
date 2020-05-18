import React, { useState } from 'react';

export const UIContext = React.createContext({})

const UIProvider = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNavHidden, setNavHidden] = useState(false);
  const [isEdited, setEdit] = useState(false);

  return (
    <UIContext.Provider value={{
      isMenuOpen,
      setMenuOpen,
      isNavHidden,
      setNavHidden,
      isEdited,
      setEdit
    }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider;
