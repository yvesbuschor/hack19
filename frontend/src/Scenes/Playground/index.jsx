import React from 'react';
import Button from '@material-ui/core/Button';

import { useStateValue } from 'state';
import { upvote } from 'doStuff';

const PlaygroundView = (props) => {
  const [state, dispatch] = useStateValue();
  console.log({state});

  return (
    <>
      <h1>🏓</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => upvote(
            {
              "_id": "5d8f7714586bc10017c85f6b",
              "comment": "I feel the same",
              "user": "Livio",
              "upvotes": 0,
              "downvotes": 1,
              "idea_id": "5d8f6d1a586bc10017c85f69",
              "_createdOn": "2019-09-28T15:07:00.916Z"
            }, dispatch)}>
        Ping Pong
      </Button>
    </>
  );
}

export default PlaygroundView;