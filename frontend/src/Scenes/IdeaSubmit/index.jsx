import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import routes from 'routes';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


import { useStateValue } from 'state';
import { createIdea } from 'doStuff';


const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
  },
}));

const IdeaSubmitView = (props) => {
  const [state, dispatch] = useStateValue();
  const classes = useStyles();
  const createData = state.create.data;
  const createStatus = state.create.status;

  console.log({state, createData});

  const updateFormData = (formKey) => (event) => {
    dispatch({
      type: 'create.dataUpdated',
      data: {
        [formKey]: event.target.value,
      },
    });
  }

  const handleSubmit = () => {
    createIdea(
      {
        "title": createData.title,
        "description": createData.description,
        "user": createData.user,
        "upvotes": 0,
        "downvotes": 0, 
        "successState": "unresolved",
      },
      createData.location_id || null,
      {
        "long": createData.long,
        "lat": createData.lat,
        "name": createData.preselectedName || createData.name,
      },
      dispatch
    )
  }



  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to={routes.landing}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Submit Change Idea
          </Typography>
        </Toolbar>
      </AppBar>
      <Map
        center={[createData.lat, createData.long]}
        zoom={15}
        height={150}
      >
        <Marker anchor={[createData.lat, createData.long]} />
      </Map>
      <div className={classes.formContainer}>
        <TextField
          disabled={!!createData.preselectedName}
          id="company-name"
          label="Company / Location Name"
          className={classes.textField}
          margin="normal"
          value={createData.preselectedName || createData.name || ''}
          onChange={updateFormData('name')}
        />
        <TextField
          id="idea-title"
          label="Idea Title"
          className={classes.textField}
          margin="normal"
          value={createData.title || ''}
          onChange={updateFormData('title')}
        />
        <TextField
          id="idea-description"
          className={classes.textField}
          label="Description"
          helperText="describe an actionable idea"
          margin="normal"
          multiline
          rows="3"
          calue={createData.description || ''}
          onChange={updateFormData('description')}
        />
        <TextField
          id="user"
          label="Your Name"
          className={classes.textField}
          margin="normal"
          value={createData.user || ''}
          onChange={updateFormData('user')}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          // className={buttonClassname}
          disabled={createStatus === 'pending'}
          onClick={handleSubmit}
        >
          Submit Idea for voting
        </Button>
        {createStatus === 'pending' && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      

    </>
  );
}

export default withRouter(props => <IdeaSubmitView {...props}/>);
