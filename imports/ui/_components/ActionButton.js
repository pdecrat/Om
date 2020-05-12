import React, { useState, useRef, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Actions from '/imports/core/Actions';
import useCall from '/imports/ui/_hooks/useCall';

const ActionButton = ({
  name,
  target,
  callback = null,
  defaultValue = {},
  disableDialog = false,
  children
}) => {
  const ref = useRef(false)
  useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [])

  const action = useTracker(() => {
    const doc = Data.findOne({ name })

    return doc;
  }, [name]);

  if (!action) return null;

  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState(disableDialog ? defaultValue : null);
  const call = useCall();
  const open = () => {
    setData(defaultValue);
    setOpen(true);
  }
  const toggle = () => {
    setOpen(!isOpen)
  }
  const onChange = field => e => {
    setData({
      ...data,
      [field]: e.target.value
    });
  }
  const callAction = () => {
    call({ name, data, target }, (err, res) => {
      if (!err) {
        if (ref.current) {
          if (disableDialog)
            setData(defaultValue);
          else {
            setData(null);
            setOpen(false);
          }
        }
        if (callback) callback(err, res);
      }
    });
  }

  return action ? (
    <React.Fragment>
      {React.cloneElement(children, { onClick: disableDialog ? callAction : open })}
      { disableDialog || !data ?
        null
        : <Dialog open={isOpen} onClose={toggle} >
            <DialogTitle id="form-dialog-title">Créer une vue</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ajouter une vue à votre espace.
              </DialogContentText>
              {action.effects.map(({ name, options }) => {
                const effect = Actions.getEffect(name);

                return effect.form ? effect.form(data, onChange, options): null;
              })}
              <DialogActions>
                <Button onClick={toggle} color="primary">
                  Annuler
                </Button>
                <Button onClick={callAction} color="primary">
                  Créer la vue
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
      }
    </React.Fragment>
  ) : null;
}
export default ActionButton;
