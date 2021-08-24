import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HomeIcon from '@material-ui/icons/Home';

import SubMenu from './SubMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    borderColor: '#a2d2e5',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  homeIcon: {
    marginLeft: 10,
    marginRight: 10,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#a2d2e5',
      borderRadius: 50
    }
  }
}));

const menuData = [
  {
    id: 1,
    title: 'Electronic Devices',
    subMenu: [
      {
        id: 1,
        title: 'Mobiles'
      },
      {
        id: 2,
        title: 'Tablets'
      },
      {
        id: 3,
        title: 'Laptops'
      },
      {
        id: 4,
        title: 'Desktops Computers'
      },
      {
        id: 5,
        title: 'Audio'
      },
      {
        id: 6,
        title: 'Monitors'
      },
      {
        id: 7,
        title: 'Printers'
      },
      {
        id: 8,
        title: 'Console Gaming'
      },
      {
        id: 9,
        title: 'Smartwatches'
      },
      {
        id: 10,
        title: 'Security Cameras & Systems'
      }
    ]
  },
  {
    id: 2,
    title: 'TV & Home Appliances',
    subMenu: [
      {
        id: 1,
        title: 'TV Accessories'
      },
      {
        id: 2,
        title: 'Large Appliances'
      },
      {
        id: 3,
        title: 'Small Appliances'
      },
      {
        id: 4,
        title: 'Televisions & Videos'
      }
    ]
  },
  {
    id: 3,
    title: 'Health & Beauty',
    subMenu: [
      {
        id: 1,
        title: 'Skincare'
      },
      {
        id: 2,
        title: 'Make-Up'
      },
      {
        id: 3,
        title: 'Beauty-Tools'
      },
      {
        id: 4,
        title: 'Bath & Body'
      },
      {
        id: 5,
        title: 'Hair Care'
      },
      {
        id: 6,
        title: 'Personal Care'
      }
    ]
  },
  {
    id: 4,
    title: 'Babies & Toys',
    subMenu: [
      {
        id: 1,
        title: 'Toys & Games'
      },
      {
        id: 2,
        title: 'Nursery'
      },
      {
        id: 3,
        title: 'Baby Gear'
      },
      {
        id: 4,
        title: 'Learning & Education'
      },
      {
        id: 5,
        title: 'Baby & Toddler Toys'
      }
    ]
  },
  {
    id: 5,
    title: 'Home & Lifestyle',
    subMenu: [
      {
        id: 1,
        title: 'Power Tools'
      },
      {
        id: 2,
        title: 'Bedding'
      },
      {
        id: 3,
        title: 'Bath'
      },
      {
        id: 4,
        title: 'Hand Tools'
      },
      {
        id: 5,
        title: 'Lighting'
      },
      {
        id: 6,
        title: 'Furniture'
      },
      {
        id: 7,
        title: 'Kitchen & Dining'
      },
      {
        id: 8,
        title: 'Stationery & Craft'
      },
      {
        id: 9,
        title: 'Laundry & Cleaning'
      },
      {
        id: 10,
        title: 'Media, Music & Books'
      }
    ]
  },
  {
    id: 6,
    title: 'Fashion',
    subMenu: [
      {
        id: 1,
        title: 'Men Clothing'
      },
      {
        id: 2,
        title: 'Women Clothing'
      },
      {
        id: 3,
        title: 'Men Shoes'
      },
      {
        id: 4,
        title: 'Women Shoes'
      }
    ]
  },
  {
    id: 7,
    title: 'Sports & Travel',
    subMenu: [
      {
        id: 1,
        title: 'Travel'
      },
      {
        id: 2,
        title: 'Water Sports'
      },
      {
        id: 3,
        title: 'Sports Accessories'
      }
    ]
  }
];

export default function Menu(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeIcon color="action" className={classes.homeIcon} />
      {menuData.map((menu) => {
        return <SubMenu key={menu.id} menu={menu} />;
      })}
    </div>
  );
}
