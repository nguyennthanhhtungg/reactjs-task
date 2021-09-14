import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import parse from 'html-react-parser';

import ProductContext from '../../pages/Product/productContext';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Summary from './Summary';
import YourComment from './YourComment';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue } from '@material-ui/core/colors';
import Item from './Item';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  comment: {
    backgroundColor: 'white',
    padding: 15
  },
  pagination: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'end'
  }
}));

export default function Comment(props) {
  const classes = useStyles();

  const { store } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Ratings & Reviews (304)
      </Typography>
      <div className={classes.comment}>
        <Summary />
        <Divider />
        <YourComment />
        <Divider />
        {/*{[...new Array(5)].map((index) => {*/}
        {/*  return <Item key={index} />;*/}
        {/*})}*/}
        {/*<div className={classes.pagination}>*/}
        {/*  <Pagination count={10} color="primary" />*/}
        {/*</div>*/}
        <Typography
          style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bolder' }}
        >
          No Comments
        </Typography>
      </div>
    </div>
  );
}
