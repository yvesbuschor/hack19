import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStateValue } from 'state';
import { addComment } from 'doStuff';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1,
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  commentrow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}));

const CommentField = ({ idea }) => {
  const classes = useStyles();
  const [, dispatch] = useStateValue();
  const defaultComment = { user: "Sepp", upvotes: 0, downvotes: 0, idea_id: idea._id, comment: "" };
  const [comment, setComment] = React.useState(defaultComment);

  const updateComment = (event) => {
    setComment({...comment, comment: event.target.value});
  }

  return (
    <div className={classes.commentrow}>
      <TextField
            id="outlined-dense-multiline"
            label="Comment"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
            onChange={updateComment }
            value={comment.comment}
        />
      <Button onClick={() => {addComment(comment, idea._id, dispatch); setComment(defaultComment);} }>Submit</Button>
    </div>
  );
}

export default props => <CommentField {...props}/>;