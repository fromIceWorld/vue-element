function transformValue(obj: any) {
    const { type, options, value } = obj;
    if (['string', 'array', 'boolean'].includes(type)) {
        return value;
    } else if (type === 'list') {
        let arr = options.map((key: string) => {
            return {
                label: key,
                key,
            };
        });
        return arr;
    } else if (type == 'json') {
        return JSON.parse(value);
    }
}
export { transformValue };
