import MainTabs from "../view/main/main-toolbar.vue";
import Home from "../view/main/home.vue";
import Chat from "../view/main/chat.vue";
import Person from "../view/main/person.vue";
import Music from "../view/main/tune.vue";
console.log(Home)
export default [
    { path: "/",  async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/main/main-toolbar.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        } 
    },
    { path: "/home", async (routeTo, routeFrom, resolve, reject) { // 动态导入组件，返回回调
        console.log(routeTo)
            const vueComponent = () => import('../view/main/home.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: "/chat", async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/main/chat.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: "/tune", async (routeTo, routeFrom, resolve, reject) {
        console.log(routeTo)
            const vueComponent = () => import('../view/main/tune.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: "/person",  async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/main/person.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        } 
    },
    { path: "/login", async (routeTo, routeFrom, resolve, reject) {
        console.log(routeTo)
            const vueComponent = () => import('../view/login/login.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: '/panel-left', async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/panel/panel-left.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: '/panel-right', async (routeTo, routeFrom, resolve, reject) {
        const vueComponent = () => import('../view/panel/panel-right.vue');
        vueComponent().then((vc) => { resolve({ component: vc.default }) });
    }
},
];