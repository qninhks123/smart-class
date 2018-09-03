import Vuex  from "vuex";
import Vue   from "vue";
import axios from "axios";

Vue.use(Vuex);
module.exports = new Vuex.Store({
    
    state:{
        account:{},
        loading : false,
        online : 0,
        dialog  : {
            info: false
        } 
    },
    mutations:{
        SETUP_ACCOUNT(props){
            this.state.account.code = props.code;
        }
    }
});