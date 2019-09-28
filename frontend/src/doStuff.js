import * as db from 'databaseAdapter';

export function fetchIdeas(dispatch) {
    let action  = {
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
    dispatch(action);
}

export function fetchIdeasByLocation(locationid, dispatch) {
    let action  = {
        type: 'idea.fetching',
    };
    dispatch(action);
    const ideas = db.getIdeasByLocation(locationid);
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
    dispatch(action);
}

export function createIdea(idea, location, dispatch){
    let action = {
        type: 'idea.save'
    }
    dispatch(action);
    const newLocation = db.createLocation(location);
    let newIdea = null;
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

export function addComment(data, ideaid, dispatch) {
    let action = {
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

export function fetchLocations(dispatch){
    let action = {
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