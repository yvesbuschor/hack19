import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import './map.css'

import { Link } from 'react-router-dom';
import routes from 'routes';
import Button from '@material-ui/core/Button';

import FloatingActionButtons from 'Components/FAB';
import TransitionBar from 'Components/TransitionBar';
import IdeaWrapper from 'Components/IdeaWrapper';

import { useStateValue } from 'state';
import { fetchLocations, fetchIdeas, getComments } from 'doStuff';


const MapScene = (props) => {
  const [state, dispatch] = useStateValue();
  const [selectedPlace, setSelectedPlace] = React.useState({});
  const [mapSpot, setMapSpot] = React.useState(null);
  const [showContent, setShowContent] = React.useState(null);

  const places = state.location.data;

  React.useEffect(() => {
    fetchLocations(dispatch);
    fetchIdeas(dispatch);
    getComments(dispatch);  
  }, [dispatch]);


  const handleMarkerClick = (place) => {
    if (mapSpot) {
      setMapSpot(null);
      setShowContent('NOTHING');
    }
    if (Object.entries(selectedPlace).length > 0 && selectedPlace._id === place._id) {
      setSelectedPlace({});
      setShowContent('NOTHING');
    } else {
      setSelectedPlace(place);
      setShowContent('LITTLE');
    }
  }

  const handleMapClick = ({ latLng }) => {
    setShowContent('NOTHING');
    if (Object.entries(selectedPlace).length > 0) {
      setSelectedPlace({});
    } else if (mapSpot) {
      setMapSpot(null);
    } else {
      setMapSpot(latLng);
    }
  }

  const handleTransitionBarClick = () => {
    if(showContent === 'ALL') {
      setShowContent('LITTLE');
    } else {
      setShowContent('ALL');
    }
  }

  const show = (content) => {
    switch(content){
      case 'ALL':
        return "place-info shown";
      case 'LITTLE':
        return "place-info shown-little ";
      case 'NOTHING':
        return "place-info";
      default:
        return "place-info";
    }
  }

  const setLocation = (lol) => {
    dispatch({
      type: 'create.dataUpdated',
      data: {
        lat: lol.lat,
        long: lol.long,
        location_id: lol._id || undefined,
        preselectedName: lol.name || undefined,
      }
    });
  }

  return (
    <>
      <div style={{ height: '100vh', width: '100vw', overflow: 'hidden'}}>
        <Map
          center={[47.3892, 8.5153]}
          zoom={15}
          onClick={handleMapClick}
        >
          {
            places && places.length > 0
            && places.map(place => (
                <Marker
                  key={place._id}
                  anchor={[place.lat, place.long]}
                  onClick={() => handleMarkerClick(place)} />
              )
            )
          }
        </Map>
        <FloatingActionButtons />
        <div className={show(showContent)}>
          <TransitionBar onClick={() => handleTransitionBarClick() }/> 
          <div className={"transition-body"}>
          <p className={"location"}>{selectedPlace.name}</p>
          { state.idea.data.filter((idea) => { return idea.location_id === selectedPlace._id })
          .sort((left, right) => { return left._createdOn < right._createdOn})
          .map((idea) => { return <IdeaWrapper key={idea._id} idea={idea}/>})}
          <Button
            component={Link}
            to={routes.ideaSubmit}
            variant="contained"
            color="primary"
            onClick={ () => setLocation(selectedPlace) }
          >Add Idea</Button>
          </div>
        </div>
        <div className={mapSpot !== null ? "place-add shown " : "place-info"}>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
            <Button
              component={Link}
              to={routes.ideaSubmit}
              variant="contained"
              color="primary"
              onClick={() => setLocation({lat: mapSpot[0], long: mapSpot[1]})}
            >
              Add a change idea here
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MapScene;
