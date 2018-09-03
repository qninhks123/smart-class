import Vuex  from "vuex";
import Vue   from "vue";

Vue.use(Vuex);
module.exports = new Vuex.Store({
    
    state:{
        side: 'admin',
        account:{},
        dialog:{
            terminal: false,
            subject_editor: false,
            account_editor: false,
            info: false,
        },
        router :null,   
        loading: false,  
        online: 0,
    },
    mutations:{
        SETUP_ACCOUNT(account){
            this.state.account = account;
        }
    }
});