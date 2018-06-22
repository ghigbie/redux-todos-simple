const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//action creators
function addTodoAction(todo){
    return {
        type: ADD_TODO,
        todo,
    };
}

function removeTodoAction(id){
    return{
        type: REMOVE_TODO,
        id,
    };
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id,
    };
}
function addGoalAction(goal){
    return{
        type: ADD_GOAL,
        goal,
    };
}
function removeGoalAction(id){
    return{
        type: REMOVE_GOAL,
        id,
    };
}


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

function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;
    }
}

function app (state = {}, action){//this returns an object with the state
    return{
        todos: todos(state.todos, action), //we envoke the todos reducer and pass it the state and action
        goals: goals(state.goals, action) //we envoke the goals reducer and pass it the state and action
    };
}

function createStore (reducer) {
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

const store = createStore(todos); //you can only pass a single reducer to the createStore function 
store.subscribe(() => {
    console.log(`The new stare is: ${store.getState()}`);
});


//action dispatchers
store.dispatch(addTodoAction({
        id: 0,
        name: 'Learn Redux',
        complete: false
}));

store.dispatch(addTodoAction({
        id: 1,
        name: 'Wash the doggie',
        complete: false
})); 

store.dispatch(addTodoAction({
        id: 2,
        name: 'Hunt rabbits',
        complete: false
}));

store.dispatch(removeTodoAction(2));
store.dispatch(toggleTodoAction(1));

store.dispatch(addGoalAction({
        id: 0,
        name: 'Master redux'
}));

store.dispatch(addGoalAction({
        id: 1,
        name: 'Master react'
}));

store.dispatch(addGoalAction({
        id:2,
        name: 'Run a marathon'
}));

store.dispatch(removeGoalAction(2));