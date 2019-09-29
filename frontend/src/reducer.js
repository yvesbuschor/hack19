const mainReducer = ({idea, location, comment, create}, action) => {
  // middleware goes here, i.e calling analytics service, etc.
  return {
    idea: ideaReducer(idea, action),
    location: locationReducer(location, action),
    comment: commentReducer(comment, action),
    create: createReducer(create, action),
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

    case 'idea.singlechanged': {
      let newArray = state.data.filter((idea) => { return idea._id !== action.idea._id});
      newArray.push(action.idea);
      return {
        ...state,
        data: newArray,
        status: 'done'
      };
    }
    
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
    case 'comment.update':
    case 'comment.save':
      return {
        ...state,
        status: 'pending'
      };
    
    case 'comment.changed':
    case 'comment.saved':
      let newArray = state.data.filter((comment) => { return comment._id !== action.comment._id});
      newArray.push(action.comment);
      return {
        ...state,
        status: 'done',
        data: newArray
      }

    case 'comment.fetched':
      return {
        ...state,
        status: 'done',
        data: action.comment
      }
    
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

const createReducer = (state, action) => {
  switch (action.type) {
    case 'create.dataUpdated':
      return {
        ...state,
        data: {...state.data, ...action.data},
      };
    
    case 'create.submit':
      return {
        ...state,
        status: 'pending'
      };
      
    case 'create.success':
      return {
        ...state,
        status: 'done',
        data: {},
      };
    
    case 'create.failed':
      return {
        ...state,
        status: 'fail'
      };
    default:
      return state;
  }
};

export default mainReducer;