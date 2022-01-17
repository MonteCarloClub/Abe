// 提供过滤空值的功能
export const FilterEmpty = {
    methods: {
        filterEmpty(arr) {
            let res = arr.join(" ").split(" ").filter(s => s)
            // console.log(res);
            return res
        },
    }
}