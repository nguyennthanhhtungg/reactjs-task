import React, { useContext, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Rating from '@material-ui/lab/Rating';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import draftToHtml from 'draftjs-to-html';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import { axiosInstance } from '../../../utils/database';
import ProductContext from '../../../pages/Product/productContext';
import AppContext from '../../../contexts/appContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
}));

export default function YourComment(props) {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useContext(ProductContext);
  const appContext = useContext(AppContext);
  const [review, setReview] = useState(EditorState.createEmpty());
  const [rating, setRating] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: ''
  });

  const handleReviewChange = (e) => {
    setReview(e);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async () => {
    if (appContext.store.customer.customerId === undefined) {
      history.push('/login');
    }
    try {
      const data = {
        rate: rating,
        review: draftToHtml(convertToRaw(review.getCurrentContent())),
        productId: store.product.productId,
        customerId: appContext.store.customer.customerId
      };

      await axiosInstance.post('/Comments', data);

      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Submit Your Comment Successfully!'
      });

      setReview(EditorState.createEmpty());
      setRating(5);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response.data.Message
      });
    }
  };

  return (
    <div className={classes.root}>
      <Editor
        editorStyle={{ border: '1px solid blue', height: 120 }}
        editorState={review}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleReviewChange}
      />
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
        <Typography variant="h5">Rating: </Typography>
        <Rating
          value={rating}
          defaultValue={5}
          size="large"
          style={{ marginRight: 'auto' }}
          onChange={handleRatingChange}
        />
        <Button
          style={{ backgroundColor: 'green', color: 'white', marginRight: 30 }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar.open}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
