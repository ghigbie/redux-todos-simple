const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function todos (state = [], action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo]);
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({}, todo, { complete: !todo.complete})); //Object.assign creates a new object and merges all of the properties of thetodo onto the object excpet for complete, which is replaced bt the opposite.
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
}

function gaols (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;
    }
}

function createStore (todos) {
    let state;
    let listeners = [];
    
    const getState = () => state;
    const subscribe =  (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    };
    
    const dispatch = (action) => {
        state = todos(state, action);
        listeners.forEach((listener) => listener());
    };
    
    return {
        getState, 
        subscribe
    };
}

const store = createStore(todos);
store.subscribe(() => {
    console.log(`The new stare is: ${store.getState()}`);
});
store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
});
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

store.dispatch({
    type: 'REMOVE_TODO',
    id: 0
})