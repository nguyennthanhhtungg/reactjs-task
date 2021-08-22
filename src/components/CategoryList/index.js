import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';

import CategoryItem from '../CategoryItem';

const useStyles = makeStyles((theme) => ({
  productDIV: {
    display: 'flex'
  }
}));

const categoryData = [
  {
    id: 1,
    imageUrl:
      'https://vn-test-11.slatic.net/p/4338c2a2929f1ee5f1dd987b53d21467.jpg_80x80Q100.jpg_.webp',
    title: 'Shappoo'
  },
  {
    id: 2,
    imageUrl:
      'https://vn-test-11.slatic.net/p/9c83cd842eb4b1d386939bf24a6f61d8.jpg_80x80Q100.jpg_.webp',
    title: 'Makeup Removers'
  },
  {
    id: 3,
    imageUrl:
      'https://vn-test-11.slatic.net/p/mdc/834551498df2a281ad8c70fdf3d5a227.jpg_80x80Q100.jpg_.webp',
    title: 'Lazada Gift Cards'
  },
  {
    id: 4,
    imageUrl:
      'https://vn-test-11.slatic.net/p/31ea9d155d69b9e333fcbe0c72c3b18f.jpg_80x80Q100.jpg_.webp',
    title: 'Mobiles'
  },
  {
    id: 5,
    imageUrl:
      'https://vn-test-11.slatic.net/p/331f5a7381fc3a0e1d83898022c58584.jpg_80x80Q100.jpg_.webp',
    title: 'CChinese Dried Goods'
  },
  {
    id: 6,
    imageUrl:
      'https://vn-test-11.slatic.net/p/e919d31ab45477777f81d3977ad7a55b.jpg_80x80Q100.jpg_.webp',
    title: 'Multi-stylers'
  },
  {
    id: 7,
    imageUrl:
      'https://vn-test-11.slatic.net/p/4beec775d429fba530833ad72d8ddcb6.jpg_80x80Q100.jpg_.webp',
    title: 'Men T-Shirts'
  },
  {
    id: 8,
    imageUrl:
      'https://vn-test-11.slatic.net/p/0711d623a7098816b4154e22aeea81a6.jpg_80x80Q100.jpg_.webp',
    title: 'Women T-Shirts'
  },
  {
    id: 9,
    imageUrl:
      'https://vn-test-11.slatic.net/p/0597718f84003c6eca05cb47d6da5a8b.jpg_80x80Q100.jpg_.webp',
    title: 'Plant, Seeds and Bulbs'
  },
  {
    id: 10,
    imageUrl: 'https://my-live-02.slatic.net/p/6d1ee6156773e1fd362190eb86c4fa51.jpg',
    title: 'Wireless Earbuds'
  },
  {
    id: 11,
    imageUrl:
      'https://vn-test-11.slatic.net/p/7baa98ef3e3b168ba7dd32c988df2d91.jpg_80x80Q100.jpg_.webp',
    title: 'Other Top-úp'
  },
  {
    id: 12,
    imageUrl:
      'https://vn-test-11.slatic.net/original/f1417877dcfa7928bd0708f30a76dd57.jpg_80x80Q100.jpg_.webp',
    title: 'Baking Flour'
  },
  {
    id: 13,
    imageUrl:
      'https://vn-test-11.slatic.net/p/fe4df54c0407e18037b57ae9170e1a16.jpg_80x80Q100.jpg_.webp',
    title: 'Phone Cables & Converters'
  },
  {
    id: 14,
    imageUrl:
      'https://vn-test-11.slatic.net/p/188ec18d292b9c1038470a974c6f56e1.jpg_80x80Q100.jpg_.webp',
    title: 'Wonmen Dresses'
  },
  {
    id: 15,
    imageUrl:
      'https://vn-test-11.slatic.net/p/1ce6d9f89b43914d810699dd93559791.jpg_80x80Q100.jpg_.webp',
    title: 'Air Flyers'
  },
  {
    id: 16,
    imageUrl:
      'https://vn-test-11.slatic.net/p/568a8fc82e47710a942659b408a6c6e7.jpg_80x80Q100.jpg_.webp',
    title: 'In-Ear Headphones'
  }
];

export default function CategoryList(props) {
  const classes = useStyles();

  return (
    <Box flexWrap="wrap" className={classes.productDIV}>
      {categoryData.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Box>
  );
}
