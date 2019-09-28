import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from 'routes';
import { StateProvider } from 'state';

import LandingScene from './Scenes/Landing';
import PlaygroundScene from './Scenes/Playground';
import MapScene from './Scenes/Map';
import IdeaDetailScene from './Scenes/IdeaDetail';
import IdeaSubmitScene from './Scenes/IdeaSubmit';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Route exact path={routes.root} component={LandingScene}/>
        <Route path={routes.map} component={MapScene}/>
        <Route path={routes.playground} component={PlaygroundScene}/>
        <Route path={routes.ideaDetail} component={IdeaDetailScene}/>
        <Route path={routes.ideaSubmit} component={IdeaSubmitScene}/>
      </Router>
    </StateProvider>
  );
}

export default App;
