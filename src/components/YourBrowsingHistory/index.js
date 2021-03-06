import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import Carousel from '../Carousel';
import ProductCard from '../ProductCard';
import CustomSkeleton from '../CustomSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  }
}));

const similarProductData = [
  {
    productId: 11,
    imageUrl: 'https://my-live-02.slatic.net/p/1d25148bfc6c500bcf445c882b99e10d.jpg',
    productName: 'Product 11',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 12,
    imageUrl:
      'https://vn-test-11.slatic.net/p/c79bc09ccf499ba2c857efe862dc214e.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 12',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 13,
    imageUrl:
      'https://vn-test-11.slatic.net/p/13f04003c006d56d1895fa460887b30c.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 13',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 14,
    imageUrl:
      'https://vn-test-11.slatic.net/p/cfcc980baf8df6c2102864ea5ab90683.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 14',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 15,
    imageUrl:
      'https://vn-test-11.slatic.net/p/99c638f765db633aae9b588f020098e7.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 15',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 16,
    imageUrl:
      'https://vn-test-11.slatic.net/p/8b354fecf9eb66735230384b48a04bc0.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 16',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 17,
    imageUrl:
      'https://vn-test-11.slatic.net/p/2b83af8cc83ecdf90a5ce172970f09af.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 17',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 18,
    imageUrl:
      'https://vn-test-11.slatic.net/p/8e7dbee797e68567f4f59265bc81ae42.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 18',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 19,
    imageUrl:
      'https://vn-test-11.slatic.net/p/04ef6fa14773ebcc9a655d5d26e2808f.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 19',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 20,
    imageUrl:
      'https://vn-test-11.slatic.net/p/852356dd050b05ffcc80a696ad2568b8.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 20',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  }
];

export default function YourBrowsingHistory() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Your Browsing History
      </Typography>
      <Carousel show={6}>
        {similarProductData.length === 0 ? (
          <CustomSkeleton show={6} />
        ) : (
          similarProductData.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        )}
      </Carousel>
    </div>
  );
}
