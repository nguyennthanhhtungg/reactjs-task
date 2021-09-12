import React, { useEffect, useReducer } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import Helmet from 'react-helmet';
import ProductCard from '../../components/ProductCard';
import Carousel from '../../components/Carousel';
import reducer from '../Product/productReducer';
import { axiosInstance } from '../../utils/database';
import PromotionProductListGroupCategory from '../../components/PromotionProductListGroupCategory';

const useStyles = makeStyles((theme) => ({}));

const initialPromotionState = {
  categoryList: [],
  top: 6,
  bannerAdvertisingList: []
};

const bannerAdvertisingList = [
  {
    id: 1,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/3f/47/9d/7481730a2005919ff2199c2e53815aa0.png.webp'
  },
  {
    id: 2,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/42/be/6a/6ab36abe13531a8fc88d0a68a65a48ac.png.webp'
  },
  {
    id: 3,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/0d/0a/45/5bd03d2d6cb4453c6c7d321553f1f6d2.png.webp'
  },
  {
    id: 4,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/00/53/01/9847d101ec09bbd3bc5eeb406d870613.png.webp'
  },
  {
    id: 5,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/61/b9/d5/3bc51a06253084e77984d9d40ed249dc.png.webp'
  },
  {
    id: 6,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/a6/d5/54/394d546217046da81165a7bf1a7732ad.png.webp'
  },
  {
    id: 7,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/b7/d4/0b/963b038276432e407d048112e4793baa.png.webp'
  },
  {
    id: 8,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/6b/25/bc/b6b91e782fea26feb3bd1e9de42bdc18.png.webp'
  },
  {
    id: 9,
    url: 'https://salt.tikicdn.com/cache/w1080/ts/banner/1c/24/39/b1ca7b3f813d588eaed3111ff3bebee9.png.webp'
  }
];

export default function Promotion() {
  const classes = useStyles();
  const history = useHistory();
  const [store, dispatch] = useReducer(reducer, initialPromotionState);

  useEffect(() => {
    async function loadInit() {
      const categoryListRes = await axiosInstance.get(`/Categories`);

      if (categoryListRes.status !== 200) {
        history.push('/');
      } else {
        dispatch({
          type: 'init',
          payload: {
            categoryList: categoryListRes.data,
            bannerAdvertisingList: bannerAdvertisingList
          }
        });
      }
    }

    loadInit();
  }, []);

  return (
    <>
      <Helmet>
        <title>Promotion | React App</title>
      </Helmet>
      <Carousel show={1} auto={true}>
        {store.bannerAdvertisingList.map((bannerAdvertising) => (
          <img key={bannerAdvertising.id} src={bannerAdvertising.url} />
        ))}
      </Carousel>
      <Container maxWidth="lg">
        {store.categoryList.map((category) => {
          return (
            <PromotionProductListGroupCategory
              key={category.categoryId}
              category={category}
            />
          );
        })}
      </Container>
    </>
  );
}
