class Timer{
	constructor(time,isLoop,setTime){
		this.time = time;
		this.t = time;//保存实例倒计时时间。
		this.isLoop = isLoop;
		this.setTime = setTime;
		this.callback = () => {}//预定义一个空函数，防止callback函数为定义
	}
	nextTick(callback){
		this.callback = callback//将一个函数作为参数传入nextTick函数
	}
	start(){
		// 防止重复调用start(),使其无效.
		if(this.s){
			return
		}
		// 如果未设置倒计时时间间隔,默认间隔为1s.
		if(!this.setTime){
			this.setTime = 1000;
		}
		// 如果未设置是否循环,默认false
		if(!this.isLoop){
			this.isLoop = false;
		}
		// 打印this.callback值
		setTimeout(()=>this.callback(this.time));
		// 定义一个计时器，默认间隔时间1s
		var s = setInterval(()=>{
			if(this.time>0){
				this.time--
				this.callback(this.time)
			}
			else{
				clearInterval(s);//清除计时器，减轻消耗
				this.time = this.t;//this.time值为0时，为this.time重新赋值
				this.s =null;//计时器返回初态，以便被正常调用
				// 值为true时，循环倒计时
				if(this.isLoop){
					console.log('重新倒计时')
					this.start();
				}
			}
		},this.setTime)
		this.s = s;//为pasue(),stop()清除计时器函数提供id.
	}

	pause(){
		clearInterval(this.s)
		console.log('暂停：'+this.time)
		this.s =null;//同上
	}

	stop(){
		clearInterval(this.s)
		this.time =this.t;//重置倒计时时间
		console.log('stop:'+this.time)
		this.s = null;//同上

	}
}

const timer = new Timer(5)
timer.nextTick(time=>{
	console.log('当前倒计时：',time)
})
window.timer = timer;
// timer.start()
// timer.pause()
// timer.stop()


//js中的对象都继承自Object,所以当我们在某个对象上调用一个方法时,
//会先在该对象上进行查找,如果没找到则会进入对象的原型（也就是.prototype）进行查找,
//如果没找到,同样的也会进入对象原型的原型进行查找,直到找到或者进入原型链的顶端Object.prototype才会停止.
//toString.call(prama)实际上是,通过原型链调用了Object.prototype.toString对对象进行数据类型判断.
const getType = (prama) => {
	let type  = typeof prama;
	if(type != "object"){
		return type;
	}
	return Object.prototype.toString.call(prama).replace(/^\[object (\S+)\]$/, '$1');
}
// 正则表达式会将replace()中第一个参数圆括号内的子表达式，按从左到右的索引编号依次记忆成与之相匹配的文本。
// 当replace()里出现‘$’加数字，那么replace()将会用正则表达式记忆下来的与子表达式相匹配的文本替换之前的文本。

window.gt = getType;

getType([]) == 'Array'//true
getType({}) == 'Object'//true
getType(1) == 'number'//true
getType('a') == 'string'//true
getType(null) == 'Null'//true
getType(undefined) == 'undefined'//true
getType(true) == 'boolean'//true