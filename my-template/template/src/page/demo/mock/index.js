import {useEffect} from 'react';

export default () => {
    useEffect(() => {
        post('/user/list');
    }, []);
    return <div>mock</div>
};

function post(url) {
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    data.append('id', 12345);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseText = xhr.responseText || '{}';
            const res = JSON.parse(responseText);
            if (res && res.code === 0) {
                console.log(res.data);
            }
        }
    };

    xhr.open('POST', url);
    xhr.send(data);
}
