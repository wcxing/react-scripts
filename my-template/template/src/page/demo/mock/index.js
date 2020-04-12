import {useEffect} from 'react';
import {testRequest} from '~/service';

export default () => {
    useEffect(() => {
        testRequest()
            .then(res => console.log(res));
    }, []);
    return <div>mock</div>
};


