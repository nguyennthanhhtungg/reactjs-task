import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import { numberWithCommas } from '../../utils/currency';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 265,
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
          <Box component="div" style={{ height: 40 }}>
            <Typography variant="body2" component="p">
              {product.title}
            </Typography>
          </Box>
          <Typography variant="subtitle1" className={classes.newPrice} component="p">
            đ{numberWithCommas(product.price)}
          </Typography>

          {product.discount !== '' && (
            <div className={classes.oldPrice}>
              <span style={{ textDecoration: 'line-through' }}>
                đ{numberWithCommas(product.price)}
              </span>{' '}
              -{product.discount}%
            </div>
          )}
          <Rating defaultValue={2.5} precision={0.5} size="small" readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
