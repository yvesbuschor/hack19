import React from 'react';
import Button from '@material-ui/core/Button';

import { useStateValue } from 'state';
import { fetchIdeas } from 'doStuff';


const PlaygroundView = (props) => {
  const [{}, dispatch] = useStateValue();

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
    </>
  );
}

export default PlaygroundView;