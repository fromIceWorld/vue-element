function transformValue(obj: any) {
    const { type, options, value } = obj;
    if (
        [
            'color',
            'string',
            'slider',
            'select',
            'extend-select',
            'radio',
            'tags',
            'icon',
            'iconLink',
            'headers',
            'boolean',
            'number',
            'colors',
        ].includes(type)
    ) {
        return value;
    } else if (type == 'json') {
        return JSON.parse(value);
    } else {
        console.error(`类型未知:${type}`);
        return;
    }
}
export { transformValue };
