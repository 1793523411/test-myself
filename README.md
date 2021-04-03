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

幽灵空白节点，li与li之间的空白

变量提升/暂时性死区

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
