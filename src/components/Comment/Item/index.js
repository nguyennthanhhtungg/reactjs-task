import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import parse from 'html-react-parser';

import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#d3e9f3'
  }
}));

export default function Item(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar />
        <div style={{ marginLeft: 10, marginRight: 'auto' }}>
          <Typography style={{ fontWeight: 'bolder' }}>Nguyễn Thanh Tùng</Typography>
          <Rating defaultValue={2} size="small" readOnly />
        </div>
        <Typography style={{ color: 'gray' }}>14/09/2021</Typography>
      </div>
      <div style={{ marginLeft: 10 }}>Good Product!</div>
    </div>
  );
}
