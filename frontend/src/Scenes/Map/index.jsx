import React from 'react';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import './map.css'

import FloatingActionButtons from 'Components/FAB';
import TransitionBar from 'Components/TransitionBar';
import IdeaWrapper from 'Components/IdeaWrapper';
import LocationCard from 'Components/LocationCard';

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
    if (selectedPlace && selectedPlace._id === place._id) {
      setSelectedPlace({});
      setShowContent('NOTHING');
    } else {
      setSelectedPlace(place);
      setShowContent('LITTLE');
    }
  }

  const handleMapClick = ({ latLng }) => {
    setShowContent('NOTHING');
    if (selectedPlace) {
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
          </div>
        </div>
        <div className={mapSpot !== null ? "place-add shown " : "place-info"}>
          <b onClick={() => console.log('could add idea at:', mapSpot)}>Add a change idea here?</b>
        </div>
      </div>
    </>
  );
}
export default MapScene;
