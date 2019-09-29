import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  bar: {
    height: '4px',
    width: '10vw',
    backgroundColor: '#fff',
    borderRadius: '2px 2px 2px 2px',
    margin: 0,
    padding: 0,
  },
  transitionHead: {
    padding: '7px',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const TransitionBar = ({ onClick }) => {
  const classes = useStyles();

  return (
      <div onClick={onClick} className={classes.transitionHead}><div className={classes.bar} /></div>
  );
}


export default props => <TransitionBar {...props}/>;