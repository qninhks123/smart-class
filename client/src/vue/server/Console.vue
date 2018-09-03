<template>
    <div ref="console"></div>
</template>
<script>
    export default {
        props : ["logs"],
        mounted(){this.$nextTick(()=>{
            let keywords  = ['help','log','db','mặc_định','cls'];
            let operators = ['/','.','*','-','+','%'];
            let numbers   = ['0','1','2','3','4','5','6','7','8','9'];
            let borders   = ['(',')'];

            // HIGHT - LIGHT
            $.terminal.defaults.formatters.push(function(string) {
                return string.split(/((?:\s|&nbsp;)+)/).map(function(string) {
                    if (keywords.indexOf(string) != -1) return '[[ib;orange;]' + string + ']';
                    if (string=="javascript")           return '[[i;yellow;]' + string + ']';
    
                    return string;
                }).join('').split('').map(c=>{
                    if(numbers.indexOf(c) != -1)    return '[[;#66ccff;]'  + c + ']';
                    if(operators.indexOf(c) != -1)  return '[[;#e6e6e6;]'  + c + ']';
                    if(borders.indexOf(c) != -1)    return '[[;#00ffff;]'  + c + ']';
                    return c;
                }).join('');
            });
            window.terminal = $(this.$refs.console).terminal((command,term)=>{
                let cmd = $.terminal.parse_command(command);
                let str = cmd.args.join(' ');
                switch (cmd.name) {
                    case "cls":
                        term.clear();
                        break;
                    case "log":
                        term.echo(`${ str }`);
                        break;
                    case "help":
                        term.echo(
                            "[-] cls      :    Xóa màn hình [[b;;]máy chủ]\n"+
                            "[-] cls -p   :    Xóa lịch sử [[b;;]máy chủ]\n"+
                            "[-] log      :    Thêm lịch sử [[b;;]máy chủ]\n"+
                            "[*] mặc_định :    Chạy lệnh javascript\n"+

                        "");
                        break;
                    case "db":
                        
                    
                        break;
                    default:
                        try {
                            let result = window.eval(command);
                            if(result !== undefined) 
                                term.echo(String(result));
                        } catch (e) {
                            term.error(String(e));
                        }
                        break;
                } 
            },{
                greetings : false,
                prompt    : '[[;white;]~ ]'
            });
        })}
        
    }
</script>

