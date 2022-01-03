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
            const { userName, password } = _user
            const user = getUser(userName);

            if (!user) {
                return { err: 2 }
            }

            // 登录成功，返回 Token
            if (user.password === password) {
                return successResp({ 
                    token: "TEST_TOKEN-" + user.name
                })
            }
            // 密码错误
            return { err: 1 }
        },

        getInfo(token) {
            let sp = token.split('-');
            if (sp.length === 2 && getUser(sp[1])) {
                return successResp(getUser(sp[1]))
            }

            return { err: 1 }
        },

        logout(token) {
            return successResp({token})
        }
    }
}

export const localUsers = mockUsers()
