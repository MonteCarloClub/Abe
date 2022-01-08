import request from '@/utils/request'
import { localFiles } from "@/mock/files";

/** 文件管理
 * 
 * 加密共享文件
 * 查询共享文件
 * 解密共享文件
**/

export const fileApi = {
    /**
     * 加密共享文件
     * @param {*} _data 来自前端的参数，用于发送请求，字段不一定和请求字段一致，需要转换一下
     * @returns Promise
     */
    encrypt: function ({userName, fileName, tags, file, policy}) {
        // const _data = {userName, fileName, tags, file, policy}
        // fileName       用户名 String 
        // sharedFileName 文件名 String 
        // tags           标签 List 
        // plainContent   明文文件 File 
        // policy         共享策略 String (A AND B AND (C OR D))
        const data = new FormData();
        data.append('fileName', userName);
        data.append('sharedFileName', fileName);
        data.append('tags', tags);
        data.append('plainContent', file);
        data.append('policy', policy);
        
        return new Promise((resolve, reject) => {
            request({
                url: '/content/upload',
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
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
                    resolve(localFiles.same(data))
                }
                else reject(error)
            })
        })
    },

    /**
     * 查询共享文件
     * @param {*} _data 参数
     * @returns Promise
     */
    files: function ({ userName, tag, size, bookmark }) {
        const _data = { userName, tag, size, bookmark }
        // fromUserName 分享人 String 
        // tag          标签   String 
        // pageSize     每页显示条数 Int 默认为 10
        // bookmark     说明   String 默认为空
        const data = {
            fromUserName: _data.userName,
            tag: _data.tag,
            pageSize: _data.size,
            bookmark: _data.bookmark,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/content/list',
                method: 'post',
                data
            }).then(response => {
                // {
                //     "code":200   200, 成功; 其他，失败
                //     "msg":"success",  描述
                //     "data":{
                //          "contents":[
                //              {
                //                  "fileName":"test.txt",
                //                  "policy":"(someone:friend AND someone:family)",
                //                  "cipher":"xxx",
                //                  "tags":[
                //                      "shanghai",
                //                      "myc",
                //                      "edu",
                //                      "test"
                //                  ],
                //                  "sharedUser":"someone"
                //              }
                //          ],
                //          "bookmark":"g1AAAA...",
                //          "pageSize":10,
                //          "count":1
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
                    resolve(localFiles.files(_data))
                }
                else reject(error)
            })
        })
    },

    /**
     * 解密共享文件
     * @param {*} _data 参数
     * @returns Promise
     */
    decrypt: function (_data) {
        // userName   解密用户
        // fileName   解密文件名
        // cipher     密文
        // sharedUser 文件共享者
        const data = {
            userName: _data.userName,
            fileName: _data.fileName,
            cipher: _data.cipher,
            sharedUser: _data.sharedUser,
        }

        return new Promise((resolve, reject) => {
            request({
                url: '/content/decryption',
                method: 'post',
                data
            }).then(response => {
                // {
                //     "code":200     200, 成功; 其他，失败
                //     "msg":null,    描述
                //     "data":content 共享文件内容
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
                    console.log(error)
                }
                else reject(error)
            })
        })
    },
}