export default {
    state: {
        name: 'test'
    },
    action: {
        setData: data => data
    },
    reducer: {
        setData(state, {payload: name}) {
            return {name};
        }
    }
};
