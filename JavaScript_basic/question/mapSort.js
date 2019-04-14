// 如何让arr2的id属性按照arr1的顺序排序
let arr1 = [5, 4, 1, 7, 2, 3, 6, 8];
let arr2 = [{
        id: 1,
        data: 1
    }, {
        id: 2,
        data: 2
    }, {
        id: 3,
        data: 3
    }, {
        id: 4,
        data: 4
    }, {
        id: 5,
        data: 5
    }, {
        id: 6,
        data: 6
    }, {
        id: 7,
        data: 7
    }, {
        id: 8,
        data: 8
    }];

var result = arr1.reduce((a, b) => { return a.concat([arr2[b - 1]]) }, [])
console.log(result)