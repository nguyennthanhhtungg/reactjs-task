import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import parse from 'html-react-parser';

import ProductContext from '../../pages/Product/productContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  details: {
    backgroundColor: 'white',
    padding: 15
  }
}));

export default function ProductDetails(props) {
  const classes = useStyles();

  const { store } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Product Details
      </Typography>
      <div className={classes.details}>{parse(store.product.detailDescription)}</div>
    </div>
  );
}
