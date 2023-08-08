function transformValue(obj: any) {
    const { type, options, value } = obj;
    if (
        type === 'string' ||
        type === 'array' ||
        type === 'icon' ||
        type === 'boolean' ||
        type === 'number'
    ) {
        return value;
    } else if (type === 'list') {
        let arr = options.map((s: string) => {
            const [l, k] = s.split(':');
            return {
                label: l,
                key: k || l,
            };
        });
        return arr;
    } else if (type == 'json') {
        return JSON.parse(value);
    } else if (type == 'headers') {
        return options;
    }
}
export { transformValue };
