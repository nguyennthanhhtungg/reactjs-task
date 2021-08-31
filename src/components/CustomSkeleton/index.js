import React, { useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 265,
    marginRight: '5px',
    marginBottom: '20px'
  },
  productDIV: {
    display: 'flex'
  },
  skeleton: {
    borderRadius: 10,
    marginTop: 5
  }
});

export default function CustomSkeleton({ show }) {
  const classes = useStyles();

  return (
    <Box flexWrap="wrap" className={classes.productDIV}>
      {[...new Array(show)].map((index) => {
        return (
          <div key={index} className={classes.root}>
            <Skeleton variant="rect" height={140} />
            <Skeleton variant="rect" className={classes.skeleton} height={40} />
            <Skeleton
              variant="rect"
              className={classes.skeleton}
              width="50%"
              height={20}
            />
            <Skeleton
              variant="rect"
              className={classes.skeleton}
              width="60%"
              height={20}
            />
            <Skeleton
              variant="rect"
              className={classes.skeleton}
              width="50%"
              height={20}
            />
          </div>
        );
      })}
    </Box>
  );
}
