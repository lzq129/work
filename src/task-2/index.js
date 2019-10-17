var name = 'Global';
var context = {
    name:'context',
    whoami1: function(){
        console.log(this.name)
    },
    whoami2: ()=>{
        console.log(this.name)
    }
    // whoami2: function() {
    //         setTimeout( () => {
    //             this.whoami1()
    //         },100);
    //     }
}
var context1 = {
    name:'context1',
    // whoami1: function(){
    //     console.log(this.name)
    // },
}
context.whoami1()
context.whoami2()
var whoami1 = context.whoami1
whoami1()
whoami1.apply(context1)
whoami1.call(context1)
whoami1.bind(context1)()
// 说明：
// 使用 apply、call、bind 函数是可以改变 this 的指向的。

// apply() 方法调用一个函数, 其具有一个指定的this值，以及
// 作为一个数组（或类似数组的对象）提供的参数。

// apply 和 call 基本类似，他们的区别只是传入的参数不同。

// apply 和 call 的区别是 call 方法接受的是若干个参数列表，
// 而 apply 接收的是一个包含多个参数的数组。

// bind()方法创建一个新的函数, 当被调用时，将其this关键字
// 设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
// bind 是创建一个新的函数，我们必须要手动去调用。