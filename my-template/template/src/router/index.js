import {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import routeConfig from './router.config';
import renderRoutes from './renderRoutes';

export default () => (
    <BrowserRouter>
        <Suspense fallback={<div></div>}>
            {renderRoutes(routeConfig)}
        </Suspense>
    </BrowserRouter>
)
