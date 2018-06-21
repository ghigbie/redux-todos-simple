const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';



function todos (state = [], action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo]);
        case TOGGLE_TODO:
            return '';
        case REMOVE_TODO:
            return '';
        default:
            return state;
    }
}

function createStore (todos) {
    let state
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