// @Author: Kris

/**
 * 打印带有调用栈信息的数据
 * @param {String} msg 需要打印的字符
 * @param {Number} depth 调用栈深度
 */
export function devLog(msg, depth = 3) {
    // 只在开发环境下打印，附带函数的调用栈
    if (process.env.NODE_ENV != "development") return

    let err = new Error()
    let stack = err.stack
        .split("\n")
        .slice(2, depth + 2)
        .map(line => line.match(/at (.*) /g)[0])
        .reverse()
        .map(at_f => at_f.split(" ")[1])

    console.log(`[${stack.join(" -> ")}] :`, msg);
}