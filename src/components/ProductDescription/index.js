import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import parse from 'html-react-parser';

import ProductContext from '../../pages/Product/productContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  description: {
    backgroundColor: 'white',
    padding: 15
  }
}));

export default function ProductDesctiption(props) {
  const classes = useStyles();

  const { store } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Product Description
      </Typography>
      <div className={classes.description}>{parse(store.shortDescription)}</div>
    </div>
  );
}
