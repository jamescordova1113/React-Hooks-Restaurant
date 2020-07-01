import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 500,
  }
});

export default function FormDialog({ open, handleClose, message, handleAction, title }) {
  const classes = useStyles();
  const handleConfirmAction = () => {
    handleAction();
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
      <DialogTitle id="form-dialog-title"> {title}</DialogTitle>
      <DialogContent className={classes.root} >
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button className={classes.deleteBtnPos} onClick={handleConfirmAction} variant="contained" color="secondary">
          <DeleteIcon /> Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}