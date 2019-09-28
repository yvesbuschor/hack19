const createInitialState = {
  lat: 47.3892,
  long: 8.5153,
}

const initalState = {
  idea: { status: 'idle', data: [] },
  location: { status: 'idle', data: [] },
  comment: { status: 'idle', data: {} },
  create: { status: 'idle', data: createInitialState },
};

export default initalState;