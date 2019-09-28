import React from 'react';
import Button from '@material-ui/core/Button';

import { useStateValue } from 'state';
import { addComment } from 'doStuff';

const PlaygroundView = (props) => {
  const [{ idea }, dispatch] = useStateValue();

  return (
    <>
      <h1>🏓</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addComment(
            {
              "comment": "I feel the same",
              "user": "Livio",
              "upvotes": 0,
              "downvotes": 1
            },
            '5d8f6d1a586bc10017c85f69', dispatch)}>
        Ping Pong
      </Button>
      <ul>
        { idea && idea.data && idea.data.map(item => <li key={item._id}>{item.title}, {item.author}</li>) }
      </ul>
    </>
  );
}

export default PlaygroundView;