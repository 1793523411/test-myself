/**
 * 在这里写代码以获得语法提示
 */


function flat(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr)) {
            res.push(...flat(arr))
        } else {
            res.push(arr[i])
        }
    }
    return res
}