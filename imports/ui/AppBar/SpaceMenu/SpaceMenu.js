import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import Grower from '/imports/ui/_components/Grower';
import HomeButton from '/imports/ui/AppBar/SpaceMenu/HomeButton';
import { UIContext } from '/imports/ui/_providers/UIProvider';

const SpaceMenu = () => {
  const { setEdit, isEdited } = useContext(UIContext);

  const handleEdit = () => {
    setEdit(!isEdited);
  }

  return (
    <React.Fragment>
      <HomeButton />
      <Grower />
      <IconButton
        aria-label="space-menu"
        onClick={handleEdit}
      >
        <EditIcon/>
      </IconButton>

    </React.Fragment>
  )
}

export default SpaceMenu;
