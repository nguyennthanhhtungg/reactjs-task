import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  root: {
    width: 200,
    marginRight: '5px',
    marginBottom: '20px'
  },
  newPrice: {
    color: 'orange'
  },
  oldPrice: {
    color: 'gray'
  }
});

export default function ProductCard({ product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="image"
          height="140"
          image={product.imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography variant="h6" className={classes.newPrice} component="p">
            đ{product.price}
          </Typography>

          {product.discount !== '' && (
            <div className={classes.oldPrice}>
              <span style={{ textDecoration: 'line-through' }}>
                đ{product.price}
              </span>{' '}
              -{product.discount}%
            </div>
          )}
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            size="small"
            readOnly
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
