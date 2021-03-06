import {createStore, combineReducers} from 'redux';
import {createActions, handleActions} from 'redux-actions';

const getAction = (action, name) =>
    createActions({
        [name]: action,
    });

const getReducer = (reducer, name) =>
    Object.keys(reducer || {}).reduce((reducers, key) => {
        reducers[`${name}/${key}`] = reducer[key];
        return reducers;
    }, {});

const reducers = {};
const add = model => {
    let {name, action, reducer, state} = model;

    action = getAction(action, name);
    reducer = getReducer(reducer, name);

    reducers[name] = handleActions(reducer, state);

    delete model.action;
    delete model.state;
    delete model.reducer;

    Object.assign(model, action[name]);
};

const context = require.context('./model/', false, /\.js$/);
const files = context.keys();

files.forEach(file => {
    const model = context(file).default;
    if (!model.name) {
        model.name = file.replace(/^.+[/\\]([^.]+)\.js$/, '$1');
    }

    add(model);
});

const store = createStore(combineReducers(reducers));

export default store;
