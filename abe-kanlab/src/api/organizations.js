import request from '@/utils/request'

/** 组织管理
 * 
 * 申请成立新组织
 * 同意加入新组织
 * 提交 part-pk（生成组织/组织属性）
 * 最终确认（生成新组织/组织新属性）
 * 查询新增组织/组织属性申请
 * 查询组织信息
 * 声明组织新属性
 * 审批组织新属性
**/

export const orgApi = {
    /**
     * 申请成立新组织
     * @param {*} _data 来自前端的参数，用于发送请求，字段不一定和请求字段一致，需要转换一下
     * @returns Promise
     */
    create: function (_data) {
        // fileName 申请用户名
        // t        阈值        Int
        // n        组织成员总数 Int
        // users    组织成员列表 List
        // orgName  组织名称
        const data = {
            fileName: _data.userName,
            t       : _data.threshold,
            n       : _data.usersNum,
            users   : _data.users,
            orgName : _data.orgName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply/creation',
                method: 'post',
                data
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success",  描述
                //     "data": null
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 同意加入新组织
     * @param {*} _data 参数
     * @returns Promise
     */
    join: function (_data) {
        // fileName 用户名
        // orgName  组织名称
        const data = {
            fileName: _data.userName,
            orgName : _data.orgName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply/creation/approval',
                method: 'post',
                data
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success",  描述
                //     "data":null
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 提交 part-pk（生成组织/组织属性）
     * @param {*} _data 参数
     * @returns Promise
     */
    apply: function (_data) {
        // type     类型      CREATION/ ATTRIBUTE
        // orgName  组织名称
        // fileName 用户名    生成组织属性时为’’
        // attrName 属性名    生成组织时为’’
        
        const data = {
            type    : _data.type,
            orgName : _data.orgName,
            fileName: _data.userName,
            attrName: _data.attrName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/part-pk',
                method: 'post',
                data
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":null,  描述
                //     "data": {}
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 最终确认（生成新组织/组织新属性）
     * @param {*} _data 参数
     * @returns Promise
     */
    confirm: function (_data) {
        // type     类型      CREATION/ ATTRIBUTE
        // orgName  组织名称
        // fileName 用户名    生成组织属性时为’’
        // attrName 属性名    生成组织时为’’
        const data = {
            type    : _data.type,
            orgName : _data.orgName,
            fileName: _data.userName,
            attrName: _data.attrName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/complete-pk',
                method: 'get',
                data,
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":null,  描述
                //     "data":null
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },
    
    /**
     * 查询新增组织/组织属性申请
     * @param {*} _data 参数
     * @returns Promise
     */
    applications: function (_data) {
        // 以下参数放在 headers 中
        // type     类型      CREATION/ ATTRIBUTE
        // orgName  组织名称
        // attrName 属性名    生成组织时为’’
        const headers = {
            type    : _data.type,
            orgName : _data.orgName,
            attrName: _data.attrName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply',
                method: 'get',
                headers,
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success", 描述
                //     "data": {
                //          String orgId;
                //          Map<String, Boolean> uidMap;
                //          Map<String, Map<String, String>> shareMap;
                //          Map<String, String> opkMap;
                //          Integer t;
                //          Integer n;
                //          String fromUserName;
                //          OrgApplyStatusEnum status;
                //          String createTime;
                //          String attrName;
                //          OrgApplyTypeEnum type;
                //      }
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 查询组织信息
     * @param {*} _data 参数
     * @returns Promise
     */
    organizations: function (_data) {
        // 以下参数放在 headers 中
        // orgName  组织名称
        const headers = {
            orgName : _data.orgName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org',
                method: 'get',
                headers,
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success", 描述
                //     "data": {
                //          String orgId;
                //          List<String> uidSet;
                //          List<String> attrSet;
                //          Integer t;
                //          Integer n;
                //          String opk;
                //      }
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 声明组织新属性
     * @param {*} _data 参数
     * @returns Promise
     */
    declareAttr: function (_data) {
        // orgName  组织名称
        // fileName 用户名
        // attrName 属性名
        const data = {
            orgName : _data.orgName,
            fileName: _data.userName,
            attrName: _data.attrName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply/attribute',
                method: 'get',
                data,
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success", 描述
                //     "data": object   返回数据
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },

    /**
     * 审批组织新属性
     * @param {*} _data 参数
     * @returns Promise
     */
    approvalAttr: function (_data) {
        // fileName 用户名
        // orgName  组织名称
        // attrName 属性名
        const data = {
            fileName: _data.userName,
            orgName : _data.orgName,
            attrName: _data.attrName,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/org/apply/attribute/approval',
                method: 'post',
                data,
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success", 描述
                //     "data": object   返回数据
                // }
                if (response.code === 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }).catch(error => {
                // 调用 Mock 的数据
                if (error) {
                }
                else reject(error)
            })
        })
    },
}