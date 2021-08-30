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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { numberWithCommas } from '../../utils/currency';
import { shorten } from '../../utils/formatText';
import Grid from '@material-ui/core/Grid';
import { Stars } from '@material-ui/icons';

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
  },
  square: {
    height: 40,
    width: 40,
    backgroundColor: 'orange'
  },
  triangleTopLeft: {
    width: 0,
    height: 0,
    borderTop: '15px solid orange',
    borderRight: '20px solid transparent'
  },
  triangleTopRight: {
    width: 0,
    height: 0,
    borderTop: '15px solid orange',
    borderLeft: '20px solid transparent'
  }
});

export default function ProductCard({ product, promotionBadge }) {
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
        <Grid container style={{ position: 'relative' }}>
          {promotionBadge === true && (
            <div style={{ position: 'absolute', bottom: '85px', right: '0px' }}>
              <div className={classes.square}>
                <Typography
                  style={{ fontWeight: 'bolder', color: 'red', textAlign: 'center' }}
                  variant="subtitle2"
                >
                  {product.discount}%
                </Typography>
                <Typography
                  style={{ color: 'white', textAlign: 'center' }}
                  variant="subtitle2"
                >
                  OFF
                </Typography>
              </div>
              <div style={{ display: 'flex' }}>
                <div className={classes.triangleTopLeft}></div>
                <div className={classes.triangleTopRight}></div>
              </div>
            </div>
          )}
          <FavoriteBorderIcon
            style={{ position: 'absolute', top: '85px', right: '10px' }}
          />
        </Grid>
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
