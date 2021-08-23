import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#d3e9f3'
  },
  banner: {
    height: '100%',
    width: '100%'
  }
}));

const bannerData = [
  {
    id: 1,
    url: 'https://icms-image.slatic.net/images/ims-web/99a4fd8b-2561-4050-b2df-bafbde4ca788.jpg_1200x1200.jpg'
  },
  {
    id: 2,
    url: 'https://icms-image.slatic.net/images/ims-web/db241c19-0460-4379-8f5f-0afe220202f5.jpg'
  },
  {
    id: 3,
    url: 'https://icms-image.slatic.net/images/ims-web/2fcad12b-aafa-4667-9439-719880ef4aea.jpg'
  },
  {
    id: 4,
    url: 'https://icms-image.slatic.net/images/ims-web/2da3da6d-0fca-431b-9bcd-2e66bb29371a.jpg'
  },
  {
    id: 5,
    url: 'https://icms-image.slatic.net/images/ims-web/7fe6a26a-d231-410e-ae97-ccd11930e456.jpg'
  },
  {
    id: 6,
    url: 'https://icms-image.slatic.net/images/ims-web/1a1cfa70-9256-4147-92aa-d97ae1983de6.jpg'
  },
  {
    id: 7,
    url: 'https://icms-image.slatic.net/images/ims-web/adfe2c5a-d90a-4c62-b6a5-a3e1fdafee1d.jpg'
  },
  {
    id: 8,
    url: 'https://icms-image.slatic.net/images/ims-web/b19460c5-2db5-4753-8025-37b0ddd44f1e.jpg'
  },
  {
    id: 9,
    url: 'https://icms-image.slatic.net/images/ims-web/48016ab2-7207-4907-a3b8-76fec9ff1b8e.jpg'
  },
  {
    id: 10,
    url: 'https://icms-image.slatic.net/images/ims-web/96cfdae7-b661-4b45-9475-21db0fc52d00.jpg'
  },
  {
    id: 11,
    url: 'https://icms-image.slatic.net/images/ims-web/73fa30ac-07c5-4f3f-ba39-3f8c82fab43b.jpg'
  },
  {
    id: 12,
    url: 'https://icms-image.slatic.net/images/ims-web/6bc5d2b5-711e-45dd-9356-17f283a533a8.jpg'
  }
];

export default function Banner(props) {
  const classes = useStyles();

  const [banner, setBanner] = useState(bannerData[0]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextBannerId = banner.id % bannerData.length;
      const nextBanner = bannerData[nextBannerId];
      setBanner(nextBanner);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [banner]);

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={8}>
        <img src={banner.url} className={classes.banner} />
      </Grid>
      <Grid item xs={4}>
        <img
          src="https://salt.tikicdn.com/cache/w400/ts/banner/fd/e0/a3/7325b0efc556107dd44d9502294ee1db.png.webp"
          className={classes.banner}
        />
      </Grid>
    </Grid>
  );
}
