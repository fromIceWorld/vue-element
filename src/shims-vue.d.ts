declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
declare module 'react_app/BarChart' {
    const BarChart: any;

    export default BarChart;
}
