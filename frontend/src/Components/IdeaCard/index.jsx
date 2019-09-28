import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { upvoteIdea, downvoteIdea } from 'doStuff';
import { useStateValue } from 'state';

const useStyles = makeStyles({
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  cardContent: {
    paddingTop: '8px',
    flex: '1 0 auto',
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

const IdeaCard = ({ idea }) => {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} onClick={() => {console.log('#YOLO')}}>
        <div className={classes.title}>
          {idea.title}
        </div>
        <div className={classes.content}>
          {idea.description}
        </div>
      </CardContent>
      <div className={classes.actions}>
        <Button className={classes.button} label="Upvote" onClick={() => upvoteIdea(idea, dispatch)}><ExpandLessIcon /></Button>
        <div className={classes.counter}>{idea.upvotes - idea.downvotes}</div>
        <Button className={classes.button} label="Downvote" onClick={() => downvoteIdea(idea, dispatch)}><ExpandMoreIcon /></Button>
      </div>
    </Card>
  );
}


export default props => <IdeaCard {...props}/>;