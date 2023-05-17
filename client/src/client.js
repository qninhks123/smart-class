import Vue          from "vue";
import store        from "./client/store"
import VueRouter    from "vue-router";
import ElementUI    from 'element-ui';
import Header       from './vue/client/Header.vue';
import Menu         from './vue/client/Menu.vue';
import App          from "./vue/client/App.vue";
import StudentView  from "./vue/StudentView.vue";
import VCalendar    from "v-calendar";
import Calendar     from "./vue/Calendar.vue";
import Chart        from "./vue/Chart.vue";
import PieChart     from "./vue/PieChart.vue";
import TestCheck    from "./vue/client/TestCheck.vue";
import QuestionMenu from "./vue/QuestionMenu.vue";
import ViewHeader   from "./vue/ViewHeader.vue";
import SocketIO     from "./client/io";
import TestView     from "./vue/TestView.vue";
import NotFound     from "./vue/NotFound.vue";
import Rank         from "./vue/Rank.vue";
import TestArea     from "./vue/client/TestArea.vue";
import Info         from "./vue/Info.vue";
import TestResult   from "./vue/TestResult.vue";

// Plugins
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VCalendar);
            

// Vue-Components
Vue.component("Info",     Info);
Vue.component('Menu',     Menu);
Vue.component("Header",   Header);
Vue.component("Chart",    Chart);
Vue.component("PieChart", PieChart);
Vue.component("TestResult",TestResult);
Vue.component("Date",     Calendar);
Vue.component("QuestionMenu",QuestionMenu);
Vue.component("ViewHeader",ViewHeader);
Vue.component("NotFound", NotFound);

Vue.config.devtools = true;

// Router
var router = new VueRouter({
    // mode : "history",
    routes: [
      { path: '/',component: StudentView },
      { path: '/test', component: TestArea },
      { path: '/test/:testcode', redirect: '/test/:testcode/work' },
      { path: '/test/:testcode/work', component: TestCheck },
      { path: '/test/:testcode/info', component: TestView },
      { path: '/test/:testcode/info/:code', component: TestResult },
      { path: '/rank', component: Rank },
      { path: '/*', component:NotFound}
    ]
})
router.beforeEach((to, from, next) => {
    store.state.loading = true;
    next();
})
window.store = store;

//Render
var vm = new Vue({ router,store,
    el : '#app',
    render(h){
        return h(App);
    }
});
window.vm = vm;
Vue.use(SocketIO,{store,router});