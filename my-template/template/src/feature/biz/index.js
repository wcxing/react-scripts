import {useEffect} from 'react';
import controller from './bizController';

export default () => {
    useEffect(() => {
        controller.play();
    }, []);
    return <div>biz</div>
};
