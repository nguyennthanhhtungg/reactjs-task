import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import Carousel from '../Carousel';
import ProductCard from '../ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  }
}));

const similarProductData = [
  {
    id: 1,
    imageUrl:
      'https://vn-test-11.slatic.net/p/e42e247e165cc1d2975297ab3434d0a2.png_200x200Q100.jpg_.webp',
    title: 'Nước Tẩy Trang Dành Cho Da Đầu',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 2,
    imageUrl:
      'https://vn-test-11.slatic.net/p/53a74ab25baf112ae12d676dbbfa8e37.jpg_200x200Q100.jpg_.webp',
    title: 'Product 2',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 3,
    imageUrl:
      'https://my-live-02.slatic.net/original/fa9628a43f545d754e066814756730fa.jpg',
    title: 'Product 3',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 4,
    imageUrl:
      'https://vn-test-11.slatic.net/p/63f5ec382545686256f4db7afbc8e7aa.jpg_200x200Q100.jpg_.webp',
    title: 'Product 4',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 5,
    imageUrl:
      'https://vn-test-11.slatic.net/p/9b279c8bda898f29a47f53fc69c2e278.jpg_200x200Q100.jpg_.webp',
    title: 'Product 5',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 6,
    imageUrl:
      'https://vn-test-11.slatic.net/p/a84206e66963338ed119538b73e02899.jpg_200x200Q100.jpg_.webp',
    title: 'Product 6',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 7,
    imageUrl:
      'https://vn-test-11.slatic.net/p/e3a06778d0a9fd734f5d1f7c5f76c2cf.jpg_200x200Q100.jpg_.webp',
    title: 'Product 7',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 8,
    imageUrl:
      'https://vn-test-11.slatic.net/p/fe26a259a2cfb1535c3c06f399b63685.jpg_200x200Q100.jpg_.webp',
    title: 'Product 8',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 9,
    imageUrl:
      'https://vn-test-11.slatic.net/p/a7be5114ee008e0d32cc9de35ea45919.jpg_200x200Q100.jpg_.webp',
    title: 'Product 9',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 10,
    imageUrl:
      'https://vn-test-11.slatic.net/p/64e971aab21cb856599dec7d4425dc58.jpg_200x200Q100.jpg_.webp',
    title: 'Product 10',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 11,
    imageUrl: 'https://my-live-02.slatic.net/p/1d25148bfc6c500bcf445c882b99e10d.jpg',
    title: 'Product 11',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 12,
    imageUrl:
      'https://vn-test-11.slatic.net/p/c79bc09ccf499ba2c857efe862dc214e.jpg_200x200Q100.jpg_.webp',
    title: 'Product 12',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 13,
    imageUrl:
      'https://vn-test-11.slatic.net/p/13f04003c006d56d1895fa460887b30c.jpg_200x200Q100.jpg_.webp',
    title: 'Product 13',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 14,
    imageUrl:
      'https://vn-test-11.slatic.net/p/cfcc980baf8df6c2102864ea5ab90683.jpg_200x200Q100.jpg_.webp',
    title: 'Product 14',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 15,
    imageUrl:
      'https://vn-test-11.slatic.net/p/99c638f765db633aae9b588f020098e7.jpg_200x200Q100.jpg_.webp',
    title: 'Product 15',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 16,
    imageUrl:
      'https://vn-test-11.slatic.net/p/8b354fecf9eb66735230384b48a04bc0.jpg_200x200Q100.jpg_.webp',
    title: 'Product 16',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 17,
    imageUrl:
      'https://vn-test-11.slatic.net/p/2b83af8cc83ecdf90a5ce172970f09af.jpg_200x200Q100.jpg_.webp',
    title: 'Product 17',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 18,
    imageUrl:
      'https://vn-test-11.slatic.net/p/8e7dbee797e68567f4f59265bc81ae42.jpg_200x200Q100.jpg_.webp',
    title: 'Product 18',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 19,
    imageUrl:
      'https://vn-test-11.slatic.net/p/04ef6fa14773ebcc9a655d5d26e2808f.jpg_200x200Q100.jpg_.webp',
    title: 'Product 19',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  },
  {
    id: 20,
    imageUrl:
      'https://vn-test-11.slatic.net/p/852356dd050b05ffcc80a696ad2568b8.jpg_200x200Q100.jpg_.webp',
    title: 'Product 20',
    price: 123000,
    discount: 10,
    rating: 3,
    numberOfFeedback: 5
  }
];

export default function SimilarProductList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Products related to this item
      </Typography>
      <Carousel show={6}>
        {similarProductData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
}
