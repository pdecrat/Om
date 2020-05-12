import { useState } from 'react';

import useSpace from '/imports/ui/hooks/useSpace';

const useUI = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isNavHidden, setNavHidden] = useState(false);
  const [isEdited, setEdit] = useState(false);

  return {
    setMenuOpen,
    isMenuOpen,
    setNavHidden,
    isNavHidden,
    setEdit,
    isEdited
  };
}
export default useUI;
