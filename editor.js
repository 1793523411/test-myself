/**
 * 在这里写代码以获得语法提示
 */

class PromitiveNumber {
    static [Symbol.hasInstance](x){
        return x === "number"
    }
}

console.log(111 instanceof PromitiveNumber)