/**
 * 在这里写代码以获得语法提示
 */


function createStore(reducer, preloadedState, enhancer) {
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
        enhancer = preloadedState;
        preloadedState = undefined
    }
    if (typeof enhancer !== undefined) {
        return enhancer(createStore)(reducer, preloadedState)
    }

    let currentRedcer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDisPatching = false;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    function getState() {
        return currentState
    }

    function subscribe(listener) {
        if (isDisPatching) {
            throw new Error("error")
        }
        let isSubscribed = true;
        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        return function unsubscribe() {
            if (!isSubscribed) {
                return
            }
            isSubscribed = false;
            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)

        }
    }

    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new Error('error')
        }
        if (isDisPatching) {
            throw new Error('error')
        }
        try {
            isDisPatching = true;
            currentState = currentRedcer(currentState, action)
        } finally {
            isDisPatching = false
        }
        const listeners = (currentListeners = nextListeners);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
        return action
    }

    function replaceRedcer() {
        currentRedcer = nextListeners;
        dispatch({ type: ActionTypes.REPLACE })
        return store;
    }

    dispatch({type : ActionTypes.INIT})

    function observable() { 

    }

    return {
        dispatch,
        subscribe,
        getState,
        replaceRedcer,
        [$$observable]: observable
    }
}