const mainReducer = ({ idea, location, comment }, action) => {
  // middleware goes here, i.e calling analytics service, etc.
  return {
    idea: ideaReducer(idea, action),
    location: locationReducer(location, action),
    comment: commentReducer(comment, action)
  };
};

const ideaReducer = (state, action) => {
  switch (action.type) {
    case 'idea.changed':
      return {
        ...state,
        data: action.ideas,
        status: 'done'
      };
    
    case 'idea.saved':
      return {
        ...state,
        status: 'done',
        data: action.idea
      };
    
    case 'idea.saving':
    case 'idea.fetching':
      return {
        ...state,
        status: 'pending'
      };
    
    case 'idea.failed':
      return {
        ...state,
        status: 'fail'
      };
    
    default:
      return state;
  }
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case 'comment.save':
      return {
        ...state,
        status: 'pending'
      };
    
    case 'comment.saved':
      return {
        ...state,
        status: 'done',
        data: action.ideas
      };
    
    case 'comment.failed':
      return {
        ...state,
        status: 'fail'
      };
    
    default:
      return state;
  }
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'location.fetching':
      return {
        ...state,
        status: 'pending'
      };
      
    case 'location.changed':
      return {
        ...state,
        status: 'done',
        data: action.locations
      };
    
    case 'location.failed':
      return {
        ...state,
        status: 'fail'
      };
    default:
      return state;
  }
};

export default mainReducer;