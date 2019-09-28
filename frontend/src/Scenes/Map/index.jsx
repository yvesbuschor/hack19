import React from 'react';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import './map.css'

import FloatingActionButtons from 'Components/FAB';

import { useStateValue } from 'state';
import { fetchLocations } from 'doStuff';


const MapScene = (props) => {
  const [state, dispatch] = useStateValue();
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [mapSpot, setMapSpot] = React.useState(null);

  const places = state.location.data;

  React.useEffect(() => {
    fetchLocations(dispatch);
  }, [dispatch]);


  const handleMarkerClick = (place) => {
    if (mapSpot) {
      setMapSpot(null);
    }
    if (selectedPlace && selectedPlace._id === place._id) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(place);
    }
  }

  const handleMapClick = ({ latLng }) => {
    if (selectedPlace) {
      setSelectedPlace(null);
    } else if (mapSpot) {
      setMapSpot(null);
    } else {
      setMapSpot(latLng);
    }
  }


  return (
    <>
      <div style={{ height: '100vh', width: '100vw'}}>
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
        <div className={selectedPlace !== null ? "place-info shown " : "place-info"}>
          <b>{selectedPlace ? selectedPlace.name : ' '}</b>
        </div>
        <div className={mapSpot !== null ? "place-info shown " : "place-info"}>
          <b onClick={() => console.log('could add idea at:', mapSpot)}>Add a change idea here?</b>
        </div>
      </div>
    </>
  );
}
export default MapScene;
