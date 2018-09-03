window.pc = 0;

window.loading_thread = setInterval(()=>{
    let counter = $('script').length;

    pc = counter*5;
    $('.process div').css('width',pc+`%`);
},0);

$(document).ready(()=>{
    clearInterval(loading_thread);
    $('.process div').css('width',`100%`);
    setTimeout(()=>{
        $('.main-loading').fadeOut(500);
    },1000);
});
