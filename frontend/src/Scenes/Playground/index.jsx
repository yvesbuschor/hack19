import React from 'react';
import Button from '@material-ui/core/Button';

import { useStateValue } from 'state';
import { upvote, getComment, downvote } from 'doStuff';

const PlaygroundView = (props) => {
  const [state, dispatch] = useStateValue();
  console.log({state});

  return (
    <>
      <h1>🏓</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => getComment('5d8f7714586bc10017c85f6b' , dispatch)}>
        Ping
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => downvote(state.comment.data , dispatch)}>
        Pong
      </Button>
    </>
  );
}

export default PlaygroundView;