function mockUsers() {

    function getUser(name) {
        const userStr = localStorage.getItem(name)
        return userStr ? JSON.parse(userStr) : false
    }

    function setUser(user) {
        localStorage.setItem(user.userName, JSON.stringify(user))
    }

    function successResp(data) {
        return {
            err: 0,
            data
        }
    }

    return {
        signup(user) {
            if (getUser(user.userName)) {
                return { err: 1 }
            }

            setUser(user)
            return successResp(user)
        },

        login(_user) {
            const { fileName, password } = _user
            const user = getUser(fileName);

            if (!user) {
                return {
                    err: 2,
                    msg: "用户不存在"
                }
            }

            // 登录成功，返回用户信息
            if (user.password === password) {
                return successResp({
                    token: "TEST_TOKEN-" + user.name,
                    ...user
                })
            }
            // 密码错误
            return {
                err: 1,
                msg: "密码错误"
            }
        },
        
        logout(token) {
            return successResp({ token })
        }
    }
}

export const localUsers = mockUsers()
