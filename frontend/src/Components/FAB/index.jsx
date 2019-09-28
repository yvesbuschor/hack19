import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from 'routes';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { useStateValue } from 'state';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  fab: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main
  }
}));

const FloatingActionButtons = ({ location }) => {
  const classes = useStyles();
  const [, dispatch] = useStateValue();

  const setGeolocation = (position) => {
    dispatch({
      type: 'create.dataUpdated',
      data: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      }
    });
  }

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setGeolocation);
    } else { 
      alert("first select a point on the map");
    }
  }

  return (
    <div className={classes.root}>
      <Fab
        component={Link}
        to={routes.ideaSubmit}
        label="Add Idea"
        value={routes.ideaSubmit}
        className={classes.fab}
        onClick={getGeolocation}
      ><AddCircleIcon /></Fab>
    </div>
  );
}


export default withRouter(props => <FloatingActionButtons {...props}/>);