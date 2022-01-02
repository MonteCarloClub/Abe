import router from './router'
import {getters} from './store/store'
import {actions} from './store/actions'
import { Message } from 'element-ui'
import { getToken } from './utils/cookie'


const loginUrl = '/login'

// no redirect whitelist
const whiteList = [
    '/', 
    '/signup',
    loginUrl, 
]

router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === loginUrl) {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            // determine whether the user has obtained his info through getInfo
            const hasName = getters.userName()
            if (hasName) {
                next()
            } else {
                try {
                    // get user info
                    await actions.getInfo(hasToken)
                    next()

                } catch (error) {
                    // remove token and go to login page to re-login
                    await actions.resetToken()
                    Message.error(error || 'Has Error')
                    next(`${loginUrl}?redirect=${to.path}`)
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`${loginUrl}?redirect=${to.path}`)
        }
    }
})