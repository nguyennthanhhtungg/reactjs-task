import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Rating from '@material-ui/lab/Rating';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
}));

export default function YourComment(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Editor
        editorStyle={{ border: '1px solid blue', height: 120 }}
        // editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        // onEditorStateChange={this.onEditorStateChange}
      />
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
        <Typography variant="h5">Rating: </Typography>
        <Rating defaultValue={2} size="large" style={{ marginRight: 'auto' }} />
        <Button
          style={{ backgroundColor: 'green', color: 'white', marginRight: 30 }}
        >
          SUBMIT
        </Button>
      </Box>
    </div>
  );
}
