import React, { useContext } from 'react';
import ActionButton from '/imports/ui/_components/ActionButton';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SettingsIcon from '@material-ui/icons/Settings';

import ActionBar from '/imports/ui/_components/ActionBar';
import Grower from '/imports/ui/_components/Grower';
import { BlockContext } from '/imports/ui/_providers/BlockProvider';

const BlockActionBar = () => {
  const { block } = useContext(BlockContext);
  return (
    <ActionBar>
      <ActionButton
        name={`edit${block.name}`}
        target={block}
        defaultValue={{ ...block }}
      >
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </ActionButton>
      <Grower />
      <ActionButton
        name="removeBlock"
        target={block}
        disableDialog
      >
        <IconButton
          edge="end"
          aria-label="delete"
        >
          <ClearIcon />
        </IconButton>
      </ActionButton>
    </ActionBar>

  )
}

export default BlockActionBar;
