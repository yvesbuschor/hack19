import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from 'routes';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MapIcon from '@material-ui/icons/Map';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AddCircleIcon from '@material-ui/icons/AddCircle';


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

  return (
    <div className={classes.root}>
      <Fab
        component={Link}
        to={routes.ideaSubmit}
        label="Add Idea"
        value={routes.ideaSubmit}
        className={classes.fab}
      ><AddCircleIcon /></Fab>
    </div>
  );
}


export default withRouter(props => <FloatingActionButtons {...props}/>);