import Vue            from "vue";
import store          from "./server/store"
import VueRouter      from "vue-router";
import ElementUI      from 'element-ui';
import Header         from './vue/server/Header.vue';
import Menu           from './vue/server/Menu.vue';
import App            from "./vue/server/App.vue";
import Home           from "./server/Home.vue";
import TestEditor     from "./vue/TestEditor.vue";
import Ckedior        from "./vue/Ckeditor.vue";
import QuestionMenu   from "./vue/QuestionMenu.vue";
import VCalendar      from "v-calendar";
import Calendar       from "./vue/Calendar.vue";
import Chart          from "./vue/Chart.vue";
import PieChart       from "./vue/PieChart.vue"
import CardView       from "./vue/server/CardView.vue";
import Console        from "./vue/server/Console.vue";
import AccountView    from "./vue/server/AccountView.vue";
import TestView       from "./vue/TestView.vue";
import axios          from "axios";
import SubjectEditor  from "./vue/server/SubjectEditor.vue";
import NotFound       from "./vue/NotFound.vue";
import StudentView    from "./vue/StudentView.vue";
import ViewHeader     from "./vue/ViewHeader.vue";
import Rank           from "./vue/Rank.vue";
import AccountEditor  from "./vue/server/AccountEditor.vue";
import TestArea       from "./vue/server/TestArea.vue";
import Info           from "./vue/Info.vue";
import SocketIO       from "./server/io";
import TestResult     from "./vue/TestResult.vue";
// import locale     from 'element-ui/lib/locale/lang/vi'
window.chart= [];
// Plugins
Vue.use(ElementUI,);
Vue.use(VueRouter);
Vue.use(VCalendar);
Vue.use(SocketIO,{ store,router });

// Vue-Components
Vue.component("Info",        Info);
Vue.component('Menu',        Menu);
Vue.component("Header",      Header);
Vue.component("Chart",       Chart);
Vue.component("PieChart",    PieChart);
Vue.component("Date",        Calendar);
Vue.component("CardView",    CardView);
Vue.component("Console",     Console);
Vue.component("Ckeditor",    Ckedior);
Vue.component("ViewHeader",  ViewHeader);
Vue.component("QuestionMenu",QuestionMenu);
Vue.component("SubjectEditor",SubjectEditor);
Vue.component("AccountEditor",AccountEditor);

// Router
var router = new VueRouter({
    // mode : "history",
    routes: [
        { path: '/',     component: Home,},
        { path: '/accounts', component: AccountView },
        { path: "/accounts/:code", component: StudentView },
        { path: '/tools/test', component: TestEditor ,},
        { path: '/test', component: TestArea },
        { path: '/test/:testcode', redirect: '/test/:testcode/info' },
        { path: '/test/:testcode/info', component: TestView},
        { path: '/test/:testcode/info/:code', component: TestResult },
        { path: '/rank', component: Rank },
        { path: '/*', component:NotFound}
    ]
})
router.beforeEach((to, from, next) => {
    store.state.loading = true;
    next();
})
document.store = store;

//Render
var vm = new Vue({ router,store,
    el : '#app',
    render: h => h(App),
});

