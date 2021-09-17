import React, { useContext, useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AppContext from '../../contexts/appContext';

export default function SnackbarProvider(props) {
  const { store, dispatch } = useContext(AppContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={store.snackbar.open}
      autoHideDuration={3000}
      TransitionComponent={Slide}
      onClose={() =>
        dispatch({
          type: 'updateSnackbar',
          payload: {
            snackbar: {
              ...store.snackbar,
              open: false
            }
          }
        })
      }
    >
      <Alert variant="filled" severity={store.snackbar.severity}>
        {store.snackbar.message}
      </Alert>
    </Snackbar>
  );
}
