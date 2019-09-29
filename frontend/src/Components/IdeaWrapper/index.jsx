import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IdeaCard from 'Components/IdeaCard';
import CommentCard from 'Components/CommentCard';
import CommentField from 'Components/CommentField';
import { useStateValue } from 'state';

const useStyles = makeStyles({
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    alignItems: 'flex-end',
  },
});

const IdeaWrapper = ({ idea }) => {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const [showComments, setShowComments] = React.useState(false);  


  return (
    <div className={classes.card}>
        <IdeaCard key={idea._id} idea={idea} toggleComments={ () => setShowComments(!showComments) }/>
        { showComments && (
            <>
                {
                  state.comment.data.filter((comment) => { return comment.idea_id === idea._id })
                  .sort((left, right) => { return left._createdOn < right._createdOn})
                  .map((comment) => { return <CommentCard key={comment._id} comment={comment}/>})
                }
            </>)
        }
        { showComments && (
          <>
            <CommentField idea={idea}/>
          </>)
        }

    </div>
  );
}


export default props => <IdeaWrapper {...props}/>;