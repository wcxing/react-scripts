import {lazy} from 'react';
import {Route} from 'react-router-dom';

export default routes => _renderRoutes(routes, '/');

function _renderRoutes(routes, contentPath) {
    const children = [ ];
    const renderRoute = (item, routeContextPath) => {
        const currentPath = item.path;
        let newPath = /^\//.test(currentPath)
            ? currentPath
            : `${routeContextPath}/${currentPath}`;
        newPath = newPath.replace(/\/+/, '/');
        if (item.component) {
            const LazyComponent = lazy(item.component);
            children.push(
                item.subRoutes
                    ? <Route
                        key={newPath}
                        path={newPath}
                        render={props => <LazyComponent {...props}>{_renderRoutes(item.subRoutes, newPath)}</LazyComponent>}
                    />
                    : <Route
                        key={newPath}
                        path={newPath}
                        component={LazyComponent}
                        exact
                    />
            );
        }
        else {
            item.subRoutes.forEach(r => renderRoute(r, newPath));
        }
    };

    routes.forEach(item => renderRoute(item, contentPath));
    return children;
}
