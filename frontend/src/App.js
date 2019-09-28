import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import reducer from 'reducer';
import initialState from 'initialState';

import routes from 'routes';
import theme from 'theme';
import { StateProvider } from 'state';

import LandingScene from 'Scenes/Landing';
import PlaygroundScene from 'Scenes/Playground';
import MapScene from 'Scenes/Map';
import IdeaDetailScene from 'Scenes/IdeaDetail';
import IdeaSubmitScene from 'Scenes/IdeaSubmit';

import FloatingActionButtons from 'Components/FAB';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <CssBaseline />
        <Router>
          <Route exact path={routes.root} component={LandingScene}/>
          <Route path={routes.map} component={MapScene}/>
          <Route path={routes.playground} component={PlaygroundScene}/>
          <Route path={routes.ideaDetail} component={IdeaDetailScene}/>
          <Route path={routes.ideaSubmit} component={IdeaSubmitScene}/>
          <FloatingActionButtons />
        </Router>
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
