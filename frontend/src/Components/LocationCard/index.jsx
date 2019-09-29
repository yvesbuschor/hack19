import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    paddingTop: '8px',
    flex: '1 1 auto',
  },
  title: {
    fontWeight: 'bold',
  },
  actions: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  button: {
    padding: 0,
  },
  counter: {
    lineHeight: '10px',
  },
});

const LocationCard = ({ location }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.title}>
          {location.name}
        </div>
      </CardContent>
    </Card>
  );
}


export default props => <LocationCard {...props}/>;