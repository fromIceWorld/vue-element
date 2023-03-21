// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
        {
            id: 'tree',
            type: 'node',
            icon: 'font-size',
            title: '文本',
            view: 3,
            family: 'tree',
            des: '基础的tree组件',
            component: 'MyTree',
        },
    ],
    file = 'dist/assets/';
const http = require('http'),
    request = require('request');
const filesName = [
    {
        decorator: { type: 'module', crossorigin: true },
        name: 'index.js',
    },
    'index.css',
];
let options = {
    url: 'http://127.0.0.1:3000/upload',
    method: 'POST',
    json: true,
    headers: {
        'content-type': 'application/json',
    },
    body: {},
};
let files = [],
    area = 'vue-element';
filesName.forEach((fileName) => {
    let content = require('fs').readFileSync(
        file + (typeof fileName == 'string' ? fileName : fileName.name)
    );
    let buffer = Buffer.from(content);
    //@ts-ignore
    files.push({
        fileName,
        content: buffer.toString(),
    });
});
let componentsConfig = components.map((item) => {
    return {
        ...item,
        filesName,
        area,
    };
});
request(
    {
        ...options,
        body: {
            code: 200,
            data: {
                components: componentsConfig,
                content: files,
                area,
            },
        },
    },
    (err, res, body) => {
        if (res.statusCode === 200) {
            console.log(filesName, res.statusCode, '上传完成');
        }
    }
);
