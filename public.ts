// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
        {
            id: 'tree',
            type: 'node',
            icon: '#icon-shuzhuangtu',
            title: `树形控件:
                        Vue@3+element-plus`,
            view: 0,
            family: 'tree',
            color: '#41b883',
            des: '基础的tree组件',
            component: 'MyTree',
        },
        {
            id: 'date',
            type: 'node',
            title: `日期选择框:
                        Vue@3+element-plus`,
            color: '#41b883',
            icon: '#icon-time-selector',
            view: 0,
            family: 'form',
            des: '基础的下拉选择组件',
            component: 'MyDatePicker',
        },
        {
            id: 'message',
            type: 'node',
            node: 'message', // 当前节点在视图上对应的图形
            title: `消息提示框:
                        Vue@3+element-plus`,
            color: '#41b883',
            icon: '#icon-lingdang',
            view: 3,
            family: 'feedback',
            des: '基础的消息提示框组件',
            component: 'MyMessage',
        },
        {
            id: 'tabs',
            type: 'node',
            icon: '#icon-Tabs',
            title: `tabs:
                        Vue@3+element-plus`,
            color: '#41b883',
            view: 1,
            family: 'tabs',
            des: '基础的tabs组件',
            component: 'MyTabs',
        },
        // web-component 有shadow层 style与其他组件互相影响
        // {
        //     id: 'dialog',
        //     type: 'combo',
        //     node: 'rect', // 当前节点在视图上对应的图形
        //     title: `对话框:
        //                 Angular@10+ng-zorro-antd`,
        //     color: '#41b883',
        //     icon: 'message',
        //     view: 3,
        //     family: 'feedback',
        //     des: '基础的对话框组件',
        //     component: 'MyDialog',
        // },
    ],
    folderPath = './dist/assets';
const fs = require('fs'),
    path = require('path'),
    request = require('request');
const filesName = [
    {
        decorator: { type: 'module', crossorigin: true },
        name: 'index.js',
    },
    'index.css',
];
const area = 'vue-element';
components.map((item) => {
    item['filesName'] = filesName;
    item['area'] = area;
});
let options = {
    url: 'http://127.0.0.1:3000/upload',
    method: 'POST',
    headers: {
        'content-type': 'multipart/form-data',
    },
    formData: {
        files: [],
        area,
        components: JSON.stringify(components),
    },
};
// 递归遍历文件夹中的所有文件
function uploadFolder(folderPath, dir) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
        const filePath = folderPath + '/' + file;
        // 判断是否为文件夹
        if (fs.statSync(filePath).isDirectory()) {
            // 递归上传子文件夹
            uploadFolder(filePath, dir + '/' + file);
        } else {
            // 上传文件
            uploadFile(filePath, dir, file);
        }
    });
}

// 缓存上传文件
function uploadFile(filePath, dir, fileName) {
    const content = fs.readFileSync(path.resolve(__dirname, filePath));
    // @ts-ignore
    options.formData.files.push({
        content: Buffer.from(content).toString(),
        dir,
        fileName,
    });
}
// 将文件缓存
uploadFolder(folderPath, '');
console.log('共上传文件数：', options.formData.files.length);
//@ts-ignore
options.formData.files = JSON.stringify(options.formData.files);
request(options, (err, res, body) => {
    if (res.statusCode === 200) {
        console.log('上传完成');
    } else {
        console.log(body);
    }
});
