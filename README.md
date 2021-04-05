## 2021-4-5

实现继承：

```js
function Super() {}

function Sub() {}

Sub.prototype = new Super();

function Super() {}

function Sub() {
  this.call(Super);
}

function Super() {}

function Sub() {
  this.call(Super);
}

Sub.prototype = new Super();
Sub.prototype = Super.prototype();

let obj = {};

let sub = Object.create(obj.prototype);

obj.prototype.say = function () {};

function Super() {}

function Sub() {
  this.call(Super);
}

function com(Sub, Super) {
  let proto = Object.create(Super.prototype);
  proto.constrctor = Sub;
  Sub.prototype = proto;
}
```

数组扁平化:

```js
function work(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      res.push(arr[i]);
    } else {
      res.push(...work(arr[i]));
    }
  }
  return res;
}
```

实现前端路由:

```js
window.addEventListener("DOMContentLoaded", onLoad);
window.addEventListener("hashchange", onHashChange);

var routerView = null;
function onLoad() {
  routerView = document.querySelector("#roterView");
  console.log(routerView);
  onHashChange();
}

function onHashChange() {
  switch (location.hash) {
    case "#/home":
      routerView.innerHTML = "Home";
      return;
    case "#/about":
      routerView.innerHTML = "About";
      return;
    default:
      return;
  }
}
```

```js
window.addEventListener("DOMContentLoaded", onLoad);
window.addEventListener("popstate", onPopState);

var routerView = null;
function onLoad() {
  routerView = document.querySelector("#routeView");
  onPopState();

  var linkList = document.querySelectorAll("a[href");
  linkList.forEach((el) =>
    el.addEventListener("click", function (e) {
      e.preventDefault();
      history.pushState(null, "");
      onPopState();
    })
  );
}

function onPopState() {
  switch (location.pathname) {
    case "/home":
      routerView.innerHTML = "Home";
      return;
    case "/about":
      routerView.innerHTML = "About";
      return;
    default:
      return;
  }
}
```

讲一下 service worker

div 居中:行内块+test-align:center，左上 50%-移动自身两种，flex 布局-主测中居中，还有下面这一种

```css
.outer {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: rgb(77, 233, 129);
  margin: 0;
}

.inner {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  background-color: rgb(212, 28, 28);
  width: 100px;
  height: 100px;
}
```

数组-数组扁平化 --上面有了，重复了，数组扁平化的用处

一种用处是做悠哈，在小程序跨端解决方案中，有一个基于 vue 框架，在将 vue 中的数据传给小程序是会对数组做扁平化操作操作依次来提高性能

扁平化的方法：tostring 转为字符串后在处理，直接转为 json 格式后正则替换，es6 的 flat 还有下面这种：

```js
function flat(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr)) {
      res.push(...flat(arr));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
```

es6-let const

请求方法

POST 所对应的 URI 并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性

jsx

webpack 工作流程

小程序跨端

nodejs 事件循环

57 , 68

```js
var findContinuousSequence = function (target) {
  let len = Math.floor(target / 2) + 1;
  // console.log(len)
  // let res = [];
  // let sum = 0;
  // let tmp = []
  // for (let i = 1; i <= len; i++) {
  //     sum += i;
  //     tmp.push(i)
  //     while (sum > target) {
  //         sum -= tmp[0]
  //         tmp.shift()
  //     }
  //     console.log(tmp,sum)
  //     if (sum === target) {
  //         res.push(tmp.slice())
  //     }
  // }
  // return res

  let res = [];
  let i = 1;
  let j = 1;
  let sum = 0;
  while (i <= len) {
    console.log(i, j);
    if (sum < target) {
      sum += j;
      j++;
    } else if (sum > target) {
      sum -= i;
      i++;
    } else {
      let tmp = [];
      for (let k = i; k < j; k++) {
        tmp.push(k);
      }
      res.push(tmp);
      sum -= i;
      i++;
    }
  }
  return res;
};
```

```js
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  if (q.val === p.val) return p;
  while (root) {
    if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else {
      return root;
    }
  }
};
```

```js
var lowestCommonAncestor = function (root, p, q) {
  let ret = null;
  function end(curnode, p, q) {
    if (curnode === null) return 0;
    let l = end(curnode.left, p, q);
    let r = end(curnode.right, p, q);
    let v = curnode === p || curnode === q ? 1 : 0;
    v = v + l + r;
    if (v === 2 && ret === null) {
      ret = curnode;
    }
  }
  end(root, p, q);
  return ret;
};
```

## 2021-4-4

前中后层序遍历:

```js
/**
 * 在这里写代码以获得语法提示
 */

function front(root) {
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    stack.show();
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
}

function middle(root) {
  let stack = [];
  while (stack.length || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      root.show();
      root = root.right;
    }
  }
}

function end(root) {
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    let node = stack1.pop();
    stack2.push(node);
    node.left && stack1.push(node.left);
    node.right && stack1.push(node.right);
  }
  while (stack2.length) {
    stack2.pop().show();
  }
}

function ceng(root) {
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    node.show();
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
}
```

插入排序:

```js
function insertSort(arr) {
  if (!Array.isArray(arr) || arr.length < 1) return;
  let len = arr.length;
  let i = 1;
  while (i < len) {
    let tmp = arr[i];
    for (let j = i; j > 0; j--) {
      if (tmp < arr[j - 1]) arr[j] = arr[j - 1];
      else break;
    }
    arr[j] = tmp;
    i++;
  }
}
```

封装 ajax/fetch:

```js
function fetchRequest(method, url, data = {}, timeout = 5000) {
  let payload = null;
  let query = "";
  if (method === "GET") {
    for (const key in data) {
      query += `&${key}=${data[key]}`;
    }
    if (query) {
      query = "?" + query.slice(1);
    }
  } else {
    payload = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    fetch(url + query, {
      credentials: "include",
      method: method,
      header: {
        "Content-Type": "xxx",
      },
      body: payload,
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
    setTimeout(() => {
      reject(reject.bind(this, "fetch i timeout"));
    }, timeout);
  });
}

function clickFetchRequest() {
  fetchRequest("GET", "xxx")
    .then((res) => {
      console.log("Fetch success", res);
    })
    .catch((err) => {
      console.log(err);
    });
}

clickFetchRequest();
```

```js
function ajax(method, url, data, sccess, fail) {
  const XHR = new XMLHttpRequest();
  let sendData = "";
  for (const key in data) {
    sendData += "&" + key + "=" + data[key];
  }
  switch (method) {
    case "GET":
      url = sendData ? `${url}?${sendData}` : url;
      sendData = null;
      break;
    case "POST":
      if (sendData) {
        sendData = sendData.slice(1);
      }
      break;
  }
  XHR.onreadystatechange = function () {
    if (XHR.readyState !== 4) return;
    if (XHR.status === 200 || XHR.status === 304) {
      typeof sccess === "function" && success(XHR.response);
    } else {
      typeof fail === "function" && fail(XHR);
    }
  };
  XHR.open(method, url, true);
  XHR.setRequestHeader("Content-Type", "application/x-www/from-urlencoded");
  XHR.send(sendData);
}

function ajaxRequest() {
  const error = {
    message: "",
    info: null,
  };
  ajax({
    url: "xxx",
    method: "GET",
    data: {},
    overtime: 5000,
    success: function (res, response) {
      console.log("请求成功", res);
      console.log("原始响应数据 >>", response);
    },
    fail: function (err) {},
  });
}
```

内存泄漏

选择器

es6-异步解决方案

作用域

http2

setState 同步异步

代码压缩原理 : 表达式语句”才能被合并

小程序生命周期

57

```js
var twoSum = function (nums, target) {
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    let tmp = nums[i] + nums[j];
    if (tmp === target) return [nums[i], nums[j]];
    if (tmp > target) {
      j--;
    }
    if (tmp < target) {
      i++;
    }
  }
};
```

## 2021-4-3

冒泡排序:

```js
function bubblesort(arr) {
  if (!Array.isArray(arr) || arr.length < 1) return;
  let sign;
  for (let i = 0; i < arr.length; i++) {
    sign = true;
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[i] > arr[j]) {
        sign = false[arr[i].arr[j]] = [arr[j], arr[i]];
      }
    }
    if (sign) break;
  }
}
```

前中后层序遍历:

```js
function front(root) {
  if (!root) return;
  let stack = [root];
  while (root) {
    let node = stack.pop();
    node.show();
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
}

function middle(root) {
  if (!root) return;
  let stack = [];
  while (stack.length || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      root.show();
      root = root.right;
    }
  }
}

function end(root) {
  if (!root) return;
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    let node = stack1.pop();
    stack2.push(node);
    node.left && stack1.push(node.left);
    node.right && stack1.push(node.right);
  }
  while (stack2.length) {
    stack2.pop().show();
  }
}

function ceng(root) {
  if (!root) return [];
  let queue = [root];
  while (queue.length) {
    let node = queue.shift;
    node.show();
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
}
```

手写 redux:

```js
function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== undefined) {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentRedcer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDisPatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    if (isDisPatching) {
      throw new Error("error");
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("error");
    }
    if (isDisPatching) {
      throw new Error("error");
    }
    try {
      isDisPatching = true;
      currentState = currentRedcer(currentState, action);
    } finally {
      isDisPatching = false;
    }
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  function replaceRedcer() {
    currentRedcer = nextListeners;
    dispatch({ type: ActionTypes.REPLACE });
    return store;
  }

  dispatch({ type: ActionTypes.INIT });

  function observable() {}

  return {
    dispatch,
    subscribe,
    getState,
    replaceRedcer,
    [$$observable]: observable,
  };
}
```

重绘与回流

幽灵空白节点，li 与 li 之间的空白

变量提升/暂时性死区

instanceof，typeof

> Symbol.hasInstance 是 es6 的一个内置的符号,用于暴露语言内部的行为，开发者可以直接访问或重写或模拟这些行为，以 Symbol 工厂函数字符串属性的形式存在，这个主要表示：一个方法，该方法决定一个构造器对象是否认可一个个对象说是他的实例有 instanceof 使用 `Object[Symbol.hasInstanceof](arr)` //true

头部字段-大文件传输

组件，高阶组件

source-map

小程序的缓存优化

53-1 , 53-2

```js
var search = function (nums, target) {
  let count = 0;
  nums.forEach((item) => {
    if (item === target) count++;
  });
  return count;
};
```

```js
var missingNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) return i;
  }
  return nums.length;
};
```

## 2021-4-2

数组 api-splice

```js
function mySplice(startIndex, deleteCount, ...addElements) {
  let argumentsLen = arguments.length;
  let array = Object(this);
  let len = arr.length;
  let deleteArr = new Array(deleteCount);

  startIndex = computeStartIndex(startIndex, len);
  deleteCount = computeDeleteCont(startIndex, len, deleteCount, argumentsLen);

  sliceDeleteElements(array, startIndex, deleteCount, deleteArr);
  movePostElements(array, startIndex, len, deleteCount, addElements);

  for (let i = 0; i < addElements.length; i++) {
    array[startIndex + 1] = addElements[i];
  }
  array.length = len - deleteCount + addElements.length;
  return deleteArr;
}

function computeStartIndex(startIndex, len) {
  if (startIndex < 0) {
    return startIndex + len > 0 ? startIndex + len : 0;
  }
  return startIndex >= len ? len : startIndex;
}
function computeDeleteCont(startIndex, len, deleteCount, argumentsLen) {
  if (argumentsLen === 1) {
    return len - startIndex;
  }
  if (deleteCount < 0) {
    return 0;
  }
  if (deleteCount > len - startIndex) {
    return len - startIndex;
  }
  return deleteCount;
}
function sliceDeleteElements(array, startIndex, deleteCount, deleteArr) {
  for (let i = 0; i < deleteCount; i++) {
    let index = startIndex + i;
    if (index in array) {
      deleteArr[i] = array[index];
    }
  }
}
function movePostElements(array, startIndex, len, deleteCount, addElements) {
  if (deleteCount === addElements.length) return;
  if (deleteCount > addElements.length) {
    for (let i = startIndex + deleteCount; i < len; i++) {
      let fromIndex = i;
      let toIndex = i - (deleteCount - addElements.length);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
    for (let i = len - 1; i < len + addElements.length - deleteCount; i--) {
      delete array[i];
    }
  }
  if (deleteCount < addElements.length) {
    for (let i = len - 1; i >= startIndex + deleteCount; i--) {
      let fromIndex = i;
      let toIndex = i + (addElements.length - deleteCount);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
}
```

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

css 性能优化

变量对象

继承:原型链继承，构造函数，组合式继承，原型式继承，寄生式继承，寄生式组合继承

TCP 建立与连接

react-router 使用和原理

代码压缩原理

讲一下 ICE

64 61

```js
var isStraight = function (nums) {
  nums = nums.sort((a, b) => a - b).filter((item) => item !== 0);
  if (nums[nums.length - 1] - nums[0] > 4) return false;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) return false;
  }
  return true;
};
```

```js
var sumNums = function (n) {
  // return n && n + sumNums(n-1)
  return (n ** 2 + n) >> 1;
};
```
