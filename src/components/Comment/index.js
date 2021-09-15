import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import parse from 'html-react-parser';

import ProductContext from '../../pages/Product/productContext';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Summary from './Summary';
import YourComment from './YourComment';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue } from '@material-ui/core/colors';
import Item from './Item';
import Pagination from '@material-ui/lab/Pagination';
import { axiosInstance } from '../../utils/database';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  comment: {
    backgroundColor: 'white',
    padding: 15
  },
  pagination: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'end'
  }
}));

export default function Comment(props) {
  const classes = useStyles();

  const { store, dispatch } = useContext(ProductContext);
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    async function loadCommentList() {
      const res = await axiosInstance.get(
        `/Comments/CommentListWithCustomerByProductIdAndStatus?productId=${store.product.productId}&status=APPROVED`
      );

      if (res.status === 200) {
        dispatch({
          type: 'updateCommentList',
          payload: {
            commentList: res.data
          }
        });
      }
    }

    loadCommentList();
  }, [store.product, dispatch]);

  const handlePaginationChange = (event, value) => {
    setPagination(value);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Ratings & Reviews ({store.commentList.length})
      </Typography>
      <div className={classes.comment}>
        <Summary />
        <Divider />
        <YourComment />
        <Divider />
        {store.commentList.length !== 0 ? (
          <>
            {store.commentList.map((comment, index) => {
              if (index >= (pagination - 1) * 5 && index < pagination * 5) {
                return <Item key={comment.commentId} comment={comment} />;
              }
            })}
            <div className={classes.pagination}>
              <Pagination
                page={pagination}
                count={Math.ceil(store.commentList.length / 5)}
                color="primary"
                onChange={handlePaginationChange}
              />
            </div>
          </>
        ) : (
          <Typography
            style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bolder' }}
          >
            No Comments
          </Typography>
        )}
      </div>
    </div>
  );
}
