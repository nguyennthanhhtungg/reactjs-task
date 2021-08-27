import React from 'react';
import ProductCard from '../ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  productDIV: {
    display: 'flex'
  }
}));

const productData = [
  {
    productId: 1,
    imageUrl:
      'https://vn-test-11.slatic.net/p/e42e247e165cc1d2975297ab3434d0a2.png_200x200Q100.jpg_.webp',
    productName: 'Nước Tẩy Trang Dành Cho Da Đầu',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 2,
    imageUrl:
      'https://vn-test-11.slatic.net/p/53a74ab25baf112ae12d676dbbfa8e37.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 2',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 3,
    imageUrl:
      'https://my-live-02.slatic.net/original/fa9628a43f545d754e066814756730fa.jpg',
    productName: 'Product 3',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 4,
    imageUrl:
      'https://vn-test-11.slatic.net/p/63f5ec382545686256f4db7afbc8e7aa.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 4',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 5,
    imageUrl:
      'https://vn-test-11.slatic.net/p/9b279c8bda898f29a47f53fc69c2e278.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 5',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 6,
    imageUrl:
      'https://vn-test-11.slatic.net/p/a84206e66963338ed119538b73e02899.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 6',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 7,
    imageUrl:
      'https://vn-test-11.slatic.net/p/e3a06778d0a9fd734f5d1f7c5f76c2cf.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 7',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 8,
    imageUrl:
      'https://vn-test-11.slatic.net/p/fe26a259a2cfb1535c3c06f399b63685.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 8',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 9,
    imageUrl:
      'https://vn-test-11.slatic.net/p/a7be5114ee008e0d32cc9de35ea45919.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 9',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    productId: 10,
    imageUrl:
      'https://vn-test-11.slatic.net/p/64e971aab21cb856599dec7d4425dc58.jpg_200x200Q100.jpg_.webp',
    productName: 'Product 10',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
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

export default function JustForYou(props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Just for you
      </Typography>
      <Box flexWrap="wrap" className={classes.productDIV}>
        {productData.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Box>
    </>
  );
}
