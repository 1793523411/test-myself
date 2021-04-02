## 2021-4-2

数组 api-splice

instanceof 实现

```js
function myInstance(left, right) {
  let L = Object.getPrototypeOf(left);
  let R = right.prototype;

  while (true) {
    if (L === R) return true;
    L = Object.getPrototypeOf(R);
    if (L === null) return false;
  }
}
```

手写遍历器

```js
function itor(array) {
  let index = 0;
  return {
    next: function () {
      if (index < array.length) {
        return { value: arr[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
}
```

浏览器缓存

css性能优化

变量对象