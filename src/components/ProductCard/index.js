import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import { numberWithCommas } from '../../utils/currency';
import { shorten } from '../../utils/formatText';

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
  const history = useHistory();

  const handleRedirectToProductDetailPage = () => {
    history.push(`/product/${product.productId}`);
  };

  return (
    <Card className={classes.root} onClick={handleRedirectToProductDetailPage}>
      <CardActionArea>
        {product.imageUrl !== '' ? (
          <CardMedia
            component="img"
            alt="image"
            height="140"
            image={product.imageUrl}
          />
        ) : (
          <img
            style={{ height: 140 }}
            alt={product.imageName}
            src={
              'data:' + product.imageType + ';base64,' + product.encodedBase64Image
            }
          />
        )}
        <CardContent>
          <Box component="div" style={{ height: 40 }}>
            <Typography variant="body2" component="p">
              {shorten(product.productName, 40)}
            </Typography>
          </Box>
          <Typography variant="subtitle1" className={classes.newPrice} component="p">
            đ{numberWithCommas(product.price * ((100 - product.discount) / 100))}
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
