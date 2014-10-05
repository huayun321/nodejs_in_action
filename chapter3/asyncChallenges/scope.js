//function asyncFunction (callback) {
//    setTimeout(callback, 200);
//}
//
//var color = 'blue';
//
//asyncFunction(function() {
//   console.log('The color is ' + color);
//});
//
//color = 'green';
//

//setTimeout的第一个参数应该需要是function
//console.log('1');
//setTimeout(function(){console.log('2')}, 2000);
//console.log('3');

//因为setTimeout(表达式,延时时间)在执行时,是在载入后延迟指定时间后,去执行一次表达式,记住,次数是一次
//而setInterval(表达式,交互时间)则不一样,它从载入后,每隔指定的时间就执行一次表达式
//所以,完全是不一样的

//Using an anonymous function to preserve a global variable’s value

function asyncFunction(callback) {
    setTimeout(callback, 200);
}

var color = 'blue';

(function (color) {
    asyncFunction(function () {
        console.log('The color is ' + color);
    });
})(color);
color = 'green';

//闭包
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures