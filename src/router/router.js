import MainTabs from "../view/main/main-toolbar.vue";
import Home from "../view/main/home.vue";
import Chat from "../view/main/chat.vue";
import Person from "../view/main/person.vue";
import Music from "../view/main/tune.vue";
export default [
    { path: "/", component: MainTabs },
    { path: "/home", component: Home },
    { path: "/chat", component: Chat },
    { path: "/tune", component: Music },
    { path: "/person", component: Person },
    { path: "/login", async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/login/login.vue');
            vueComponent().then((vc) => { resolve({ component: vc.default }) });
        }
    },
    { path: "/cardContent", async (routeTo, routeFrom, resolve, reject) {
            const vueComponent = () => import('../view/subComponet/card-content.vue');
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