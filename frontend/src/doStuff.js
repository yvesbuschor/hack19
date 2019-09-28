import * as db from 'databaseAdapter';

export async function fetchIdeas(dispatch) {
    let action  = {
        type: 'idea.fetching',
    };
    dispatch(action);
    const ideas = await db.getIdeas();
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

export async function fetchIdeasByLocation(locationid, dispatch) {
    let action  = {
        type: 'idea.fetching',
    };
    dispatch(action);
    const ideas = await db.getIdeasByLocation(locationid);
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

export async function createIdea(idea, existingLocationID, location, dispatch){
    let action = {
        type: 'idea.save'
    }
    dispatch(action);
    let locationId = existingLocationID;
    let newIdea = null;

    if (!locationId && location) {
        const newLocation = await db.createLocation(location);
        locationId = newLocation._id;
    }
    if(locationId){
        idea = {
            ...idea,
            location_id: locationId
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

export async function addComment(data, ideaid, dispatch) {
    let action = {
        type: 'comment.save'
    };
    dispatch(action);
    data = {
      ...data,
      idea_id: ideaid
    };
    const comment = await db.addComment(data);
    if(comment !== null){
        action = {
            type: 'comment.saved',
            comment: comment
        };  
    } else {
        action = {
            type: 'comment.failed'
        }
    }
    dispatch(action);
}

export async function getComment(commentid, dispatch){
    let action = {
        type: 'comment.fetch'
    }
    dispatch(action);
    const comment = await db.getComment(commentid);
    if(comment !== null){
        action = {
            type: 'comment.changed',
            comment: comment
        }
    } else {
        action = {
            type: 'comment.failed'
        }
    }
    dispatch(action);
}

export async function fetchLocations(dispatch){
    let action = {
        type: 'location.fetch'
    }
    dispatch(action);
    const locations = await db.getLocations();
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

export async function upvote(data, dispatch){
  let action = {
    type: 'comment.update'
  }
  dispatch(action);
  const newData = {
    ...data,
    upvotes: data.upvotes + 1
  }
  const updated = await db.updateEntity(newData);
  if(updated){
      action = {
          type: 'comment.changed',
          comment: newData
      }
  } else {
      action = {
          type: 'comment.failed'
      }
  }
  dispatch(action);
}

export async function downvote(data, dispatch){
  let action = {
    type: 'comment.update'
  }
  dispatch(action);
  const newData = {
    ...data,
    downvotes: data.downvotes + 1
  }
  const updated = await db.updateEntity(newData);
  if(updated){
      action = {
          type: 'comment.changed',
          comment: newData
      }
  } else {
      action = {
          type: 'comment.failed'
      }
  }
  dispatch(action);
}

export async function upvoteIdea(data, dispatch){
  let action = {
    type: 'idea.update'
  }
  dispatch(action);
  const newData = {
    ...data,
    upvotes: data.upvotes + 1
  }
  const updated = await db.updateEntity(newData);
  if(updated){
      action = {
          type: 'idea.singlechanged',
          idea: newData
      }
  } else {
      action = {
          type: 'idea.failed'
      }
  }
  dispatch(action);
}

export async function downvoteIdea(data, dispatch){
  let action = {
    type: 'idea.update'
  }
  dispatch(action);
  const newData = {
    ...data,
    downvotes: data.downvotes + 1
  }
  const updated = await db.updateEntity(newData);
  if(updated){
      action = {
          type: 'idea.singlechanged',
          idea: newData
      }
  } else {
      action = {
          type: 'idea.failed'
      }
  }
  dispatch(action);
}