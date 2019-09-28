import React from 'react';
import Button from '@material-ui/core/Button';

import { useStateValue } from 'state';
import { fetchIdeas } from 'doStuff';

const PlaygroundView = (props) => {
  const [{ idea }, dispatch] = useStateValue();

  return (
    <>
      <h1>🏓</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fetchIdeas(dispatch)}
      >
        Ping Pong
      </Button>
      <ul>
        { idea && idea.data && idea.data.map(item => <li key={item._id}>{item.title}, {item.author}</li>) }
      </ul>
    </>
  );
}

export default PlaygroundView;