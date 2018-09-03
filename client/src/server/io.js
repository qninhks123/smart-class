import SocketIO  from "socket.io-client";
import {Notification,Message} from "element-ui";
import ajax from "axios";

module.exports = {
    async install(Vue,options){
        let io = Vue.prototype.$socket = SocketIO.connect('/');
        let router = options.router;
        let store  = options.store;

        store.state.account = (await ajax.get("/my-account")).data;

        io.on("NEW_TEST",test=>{
            let noti = Notification.success({
                position: 'top-right',
                dangerouslyUseHTMLString: true,
                title:test.name,
                message: `Bài Kiểm Tra Mới`,
            });
        });
        io.on("END_TEST",(test)=>{
            let noti = Notification.success({
                position: 'bottom-right',
                dangerouslyUseHTMLString: true,
                title:test.name,
                message: `Hết giờ`,
                onClick(){
                    router.push(`/test/${ test.testcode }/info`);
                    noti.close();
                }
            });
        });
        io.on("ONLINE",(counter)=>{
            store.state.online = counter;
        });
    }  
}