import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 80,
    height: 80,
    padding: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    marginLeft: 5,
    marginRight: 5
  }
}));

export default function SmallThumbnailImage({
  currentImageIndex,
  id,
  image,
  onChangeImageIndexHandler
}) {
  const classes = useStyles();

  const chageImageIndexHandler = () => {
    onChangeImageIndexHandler(id);
  };

  return (
    <div
      className={classes.root}
      style={{
        borderColor: currentImageIndex === id ? 'orange' : 'gray'
      }}
    >
      <img
        style={{ width: '100%', height: '100%' }}
        src={image}
        onClick={chageImageIndexHandler}
      />
    </div>
  );
}
