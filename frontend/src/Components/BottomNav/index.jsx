import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from 'routes';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapIcon from '@material-ui/icons/Map';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
});

const BottomNav = ({ location }) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={location.pathname}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to={routes.map}
        label="Map"
        value={routes.map}
        icon={<MapIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.playground}
        label="Nearby"
        value={routes.playground}
        icon={<LocationSearchingIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={routes.ideaSubmit}
        label="Add Idea"
        value={routes.ideaSubmit}
        icon={<AddCircleIcon />}
      />
    </BottomNavigation>
  );
}


export default withRouter(props => <BottomNav {...props}/>);