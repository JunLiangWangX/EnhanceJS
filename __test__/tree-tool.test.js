const  TreeTool  = require('../dist/cjs/tree-tool');
const BootsJS = require('../dist/cjs/index');


test('test TreeTool class', () => {
    const tree = {
        name: '中国',
        code: '0',
        childList: [
            {
                name: '重庆',
                code: '01',
            },
            {
                name: '四川',
                code: '02',
            },
            {
                name: '广东',
                code: '03',
            },
        ]
    }
    let arr = TreeTool.tree2Array([tree], 'childList', {
        isGenerateLevel: true,
        generateLevelAttributeName: 'level',
        isGenerateParentID: true,
        generateParentIDAttributeName: 'parentCode',
        nodeIDAttributeName: 'code',
        deleteAttributeList: ['childList']
    })
    expect(arr).toEqual(
        [
            { name: '中国', code: '0', level: 0 },
            { name: '重庆', code: '01', level: 1, parentCode: '0' },
            { name: '四川', code: '02', level: 1, parentCode: '0' },
            { name: '广东', code: '03', level: 1, parentCode: '0' },
        ]);
    let genTree = TreeTool.array2Tree(arr, 'code', 'parentCode', 'childList', (node) => {
        return !('parentCode' in node)
    })
    expect(genTree).toEqual(
        [
            {
                name: '中国',
                code: '0',
                level: 0,
                childList: [
                    { name: '重庆', code: '01', level: 1, parentCode: '0', childList: [] },
                    { name: '四川', code: '02', level: 1, parentCode: '0', childList: [] },
                    { name: '广东', code: '03', level: 1, parentCode: '0', childList: [] }
                ]
            }
        ]);

    const newtree = {
        name: '中国',
        code: '0',
        childList: [
            {
                name: '重庆',
                code: '01',
            },
            {
                name: '四川',
                code: '02',
            },
            {
                name: '广东',
                code: '03',
            },
        ]
    }
    let childList = TreeTool.getChildList([newtree], 'code', '0', 'childList')

    expect(childList).toEqual(
        [
            { name: '重庆', code: '01' },
            { name: '四川', code: '02' },
            { name: '广东', code: '03' },
        ]);


    let filterList = TreeTool.filter(genTree, 'childList', (obj) => {
        return obj.parentCode === '0'
    })
    expect(filterList).toEqual(
        [
            { name: '重庆', code: '01', level: 1, parentCode: '0', childList: [] },
            { name: '四川', code: '02', level: 1, parentCode: '0', childList: [] },
            { name: '广东', code: '03', level: 1, parentCode: '0', childList: [] },
        ]);

    let path = TreeTool.findPath(genTree, 'code', '03', 'childList')
    expect(path).toEqual(
        [
            {
                name: '中国',
                code: '0',
                level: 0,
                childList: [
                    { name: '重庆', code: '01', level: 1, parentCode: '0', childList: [] },
                    { name: '四川', code: '02', level: 1, parentCode: '0', childList: [] },
                    { name: '广东', code: '03', level: 1, parentCode: '0', childList: [] }
                ]
            },
            { name: '广东', code: '03', level: 1, parentCode: '0', childList: [] }
        ]);
})