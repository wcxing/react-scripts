// demo页面
const demo = () => import('@/page/demo');
const demo_mock = () => import('@/page/demo/mock');
const demo_store = () => import('@/page/demo/store');

const routes = [
    // demo页面
    {
        path: '/demo',
        component: demo,
        subRoutes: [
            {
                path: '/demo/mock',
                component: demo_mock,
                onEnter: () => {
                    document.title = 'demo-mock';
                },
                onLeave: () => { }
            },
            {
                path: '/demo/store',
                component: demo_store,
                onEnter: () => {
                    document.title = 'demo-store';
                },
                onLeave: () => { }
            }
        ]
    }
];

export default routes;
