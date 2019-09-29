import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { upvote, downvote } from 'doStuff';
import { useStateValue } from 'state';

const useStyles = makeStyles({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
    marginLeft: '20px',
  },
  cardContent: {
    paddingTop: '8px',
    flex: '1 1 auto',
  },
  title: {
    fontWeight: 'bold',
  },
  actions: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  button: {
    padding: 0,
  },
  counter: {
    lineHeight: '10px',
  },
});

const CommentCard = ({ comment }) => {
  const classes = useStyles();
  const [, dispatch] = useStateValue();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.title}>
          {comment.user}
        </div>
        <div className={classes.content}>
          {comment.comment}
        </div>
      </CardContent>
      <div className={classes.actions}>
        <Button className={classes.button} label="Upvote" onClick={() => upvote(comment, dispatch)}><ExpandLessIcon /></Button>
        <div className={classes.counter}>{comment.upvotes - comment.downvotes}</div>
        <Button className={classes.button} label="Downvote" onClick={() => downvote(comment, dispatch)}><ExpandMoreIcon /></Button>
      </div>
    </Card>
  );
}


export default props => <CommentCard {...props}/>;