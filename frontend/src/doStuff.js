import db from 'databaseAdapter';

function fetchIdeas(dispatch) {
    const action  = {
        type: 'idea.fetching',
    };
    dispatch(action);
    const ideas = db.getIdeas();
    if(ideas !== null){
        action = {
            type: 'idea.changed',
            ideas: ideas
        };
    } else {
        action = {
            type: 'idea.failed'
        }
    }
    dispach(action);
}

function fetchIdeas(locationid, dispatch) {
    const action  = {
        type: 'idea.fetching',
    };
    dispatch(action);
    const ideas = db.getIdeas(locationid);
    if(ideas !== null){
        action = {
            type: 'idea.changed',
            ideas: ideas
        };
    } else {
        action = {
            type: 'idea.failed'
        }
    }
    dispach(action);
}

function createIdea(idea, location, dispatch){
    const action = {
        type: 'idea.save'
    }
    dispatch(action);
    const failed = false;
    const newLocation = db.createLocation(location);
    const newIdea = null;
    if(newLocation !== null){
        idea = {
            ...idea,
            location_id: newLocation._id
        }
        newIdea = db.createIdea(idea);
    
    }
    
    if(newIdea !== null){
        action = {
            type: 'idea.saved',
            idea: newIdea
        }
    } else {
        action = {
            type: 'idea.failed'
        }
    }
    dispatch(action);
}

function addComment(data, ideaid, dispatch) {
    const action = {
        type: 'comment.save'
    };
    dispatch(action);
    const saved = db.addComment(ideaid, data);
    if(saved){
        const ideas = db.getIdeas();
        action = {
            type: 'comment.saved',
            ideas: ideas
        };  
    } else {
        action = {
            type: 'comment.failed'
        }
    }
    dispatch(action);
}

function fetchLocations(dispatch){
    const action = {
        type: 'location.fetch'
    }
    dispatch(action);
    const locations = db.getLocations();
    if(locations !== null){
        action = {
            type: 'location.changed',
            locations: locations
        }
    } else {
        action = {
            type: 'location.failed'
        }
    }
    dispatch(action);
}