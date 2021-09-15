import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as PropTypes from 'prop-types';
import ProductContext from '../../../pages/Product/productContext';
import {
  calculateRatingAverage,
  getRatingNumberByRating
} from '../../../utils/rating';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  ratingGeneralGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        <Rating name="read-only" value={props.rating} size="small" readOnly />
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={props.percentage} />
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontWeight: 'bolder' }}
        >
          ({props.number})
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
};

export default function Summary(props) {
  const classes = useStyles();
  const [ratingAverage, setRatingAverage] = useState(5);

  const { store } = useContext(ProductContext);

  useEffect(() => {
    const average = calculateRatingAverage(store.commentList);
    setRatingAverage(average);
  }, [store.commentList]);

  return (
    <Grid container>
      <Grid item xs={3} className={classes.ratingGeneralGrid}>
        <Typography
          variant="h4"
          style={{ fontWeight: 'bolder' }}
          color="textSecondary"
        >
          {ratingAverage}/5
        </Typography>
        <Rating name="read-only" value={ratingAverage} readOnly precision={0.1} />
      </Grid>
      <Grid item xs={3}>
        <LinearProgressWithLabel
          rating={5}
          percentage={
            (getRatingNumberByRating(store.commentList, 5) /
              store.commentList.length) *
            100
          }
          number={getRatingNumberByRating(store.commentList, 5)}
        />
        <LinearProgressWithLabel
          rating={4}
          percentage={
            (getRatingNumberByRating(store.commentList, 4) /
              store.commentList.length) *
            100
          }
          number={getRatingNumberByRating(store.commentList, 4)}
        />
        <LinearProgressWithLabel
          rating={3}
          percentage={
            (getRatingNumberByRating(store.commentList, 3) /
              store.commentList.length) *
            100
          }
          number={getRatingNumberByRating(store.commentList, 3)}
        />
        <LinearProgressWithLabel
          rating={2}
          percentage={
            (getRatingNumberByRating(store.commentList, 2) /
              store.commentList.length) *
            100
          }
          number={getRatingNumberByRating(store.commentList, 2)}
        />
        <LinearProgressWithLabel
          rating={1}
          percentage={
            (getRatingNumberByRating(store.commentList, 1) /
              store.commentList.length) *
            100
          }
          number={getRatingNumberByRating(store.commentList, 1)}
        />
      </Grid>
    </Grid>
  );
}
