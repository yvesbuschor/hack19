import React from 'react';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'



const MapScene = (props) => {
  React.useEffect(() => {
  }, []);
  return (
  <>
      <div style={{ height: '100vh', width: '100vw'}}>
        <Map center={[47.3892, 8.5153]} zoom={12}>
    <Marker anchor={[47.3892, 8.5153]} payload={1} onClick={({ event, anchor, payload }) => {console.log('click marker', { event, anchor, payload })}} />
  </Map>
        <div>
          yoooo
        </div>
      </div>
  </>
);
}
export default MapScene;
