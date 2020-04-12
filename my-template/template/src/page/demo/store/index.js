import {useEffect} from 'react';
import {connect} from 'react-redux';
import testModel from '@/model/test';

const StoreDemo = ({name, changeName}) => {
    useEffect(() => {
        const timer = setInterval(() => {
            changeName();
        }, 1000);
        return () => {
            clearInterval(timer)
        };
    }, []);
    return <div>{name}</div>;
};

const mapStateToProps = ({test: {name}}) => ({name});
const mapDispatchToProps = dispatch => ({
    changeName() {
        dispatch(testModel.setData(Math.random().toString()));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreDemo);
