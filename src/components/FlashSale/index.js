import React from 'react';
import ProductCard from '../ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  productDIV: {
    display: 'flex'
  }
}));

const productData = [
  {
    id: 1,
    imageUrl:
      'https://vn-test-11.slatic.net/p/465faefd5955de03d88e0613da9907f9.jpg_200x200Q100.jpg_.webp',
    title: 'Nước Tẩy Trang Dành Cho Da Đầu',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 2,
    imageUrl:
      'https://vn-test-11.slatic.net/p/b55311acf73755f50a54503a8c463649.jpg_200x200Q100.jpg_.webp',
    title: 'Product 2',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 3,
    imageUrl:
      'https://vn-test-11.slatic.net/p/7fe128c57d59b4bf86c1a06c606a49da.jpg_200x200Q100.jpg_.webp',
    title: 'Product 3',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 4,
    imageUrl:
      'https://vn-test-11.slatic.net/p/1369fbe7d43895ca2bd88b79a3512baa.jpg_200x200Q100.jpg_.webp',
    title: 'Product 4',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 5,
    imageUrl:
      'https://vn-test-11.slatic.net/p/b2ae3e9b2196fb78c3a6adac5e068655.jpg_200x200Q100.jpg_.webp',
    title: 'Product 5',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 6,
    imageUrl:
      'https://vn-test-11.slatic.net/p/aa988851ce08859414cff26f097a5354.jpg_200x200Q100.jpg_.webp',
    title: 'Product 6',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  }
];

export default function FlashSale(props) {
  const classes = useStyles();

  return (
    <Box flexWrap="wrap" className={classes.productDIV}>
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
