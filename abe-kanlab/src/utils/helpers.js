/**
 * 生命周期钩子函数插桩 log
 * 
 * 直接在 Component 组件内解构即可
 * 
 * 当属性相同时写在后面的会覆盖前面，为了不影响自己写的钩子函数，可以将本方法放在最前面
 * 
 * export default {
 *   name: "Home",
 *   data: () => {},
 *   methods: {},
 * 
 *   ...logLifeCycles(),  // Log in lifecycles, place before your hook functions
 * 
 *   created() {
 *     // Do Something...
 *   },
 * 
 *   // other hook functions
 * };
 * 
 * @returns 包含生命周期钩子的 Object
 */
export function logLifeCycles() {
    let logs = {};
    [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "activated",
        "deactivated",
        "beforeUpdate",
        "updated",
        "destroyed",
    ].map(hook => logs[hook] = function () {
        console.log("[lifecyle]", this.$options.name, hook);
    })
    return logs;
}

/**
 * 节流
 * @reference https://stackoverflow.com/questions/27078285/simple-throttle-in-javascript
 * @param {*} callback 
 * @param {*} limit 
 * @returns 
 */
export function throttle(callback, limit) {
    let obj;
    var waiting = false;                         // Initially, we're not waiting
    return function () {                         // We return a throttled function
        if (!waiting) {                          // If we're not waiting
            obj = this                           // For bind this in setTimeout
            waiting = true;                      // Prevent future invocations
            setTimeout(function () {             // After a period of time
                callback.apply(obj, arguments);  // Execute users function
                waiting = false;                 // And allow future invocations
            }, limit);
        }
    }
}