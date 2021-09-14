import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as PropTypes from 'prop-types';

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

  return (
    <Grid container>
      <Grid item xs={3} className={classes.ratingGeneralGrid}>
        <Typography
          variant="h4"
          style={{ fontWeight: 'bolder' }}
          color="textSecondary"
        >
          {4.9}/5
        </Typography>
        <Rating name="read-only" value={4.7} readOnly precision={0.1} />
      </Grid>
      <Grid item xs={3}>
        <LinearProgressWithLabel rating={5} percentage={50} number={10} />
        <LinearProgressWithLabel rating={4} percentage={40} number={9} />
        <LinearProgressWithLabel rating={3} percentage={30} number={8} />
        <LinearProgressWithLabel rating={2} percentage={20} number={7} />
        <LinearProgressWithLabel rating={1} percentage={10} number={6} />
      </Grid>
    </Grid>
  );
}
