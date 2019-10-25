var name = 'Global';
// ES5创建父类
function Parent() {
  this.name = "Parent";
}

Parent.prototype.sayName = function(){
  console.log('\nES5Name:' + this.name +'\n')
}
//创建方法不要用箭头函数，会导致this指向不正确。
// Parent.prototype.sayName = () =>{
// 	console.log('\nES5Name:' + this.name)
// };

// 第一步生成子类原型
const childPrototype = new Parent()
//第二步，创建子类

function Child(){
	this.name = "Child";
}
//第三步，将子类原型指向刚刚创建的原型
Child.prototype = childPrototype
//这个方法有缺点，缺点在于调用子类的构造函数的时候，并没调用父类的构造函数
//这个是最简单的继承方式达到了原型链的要求

// extend继承函数(这里是Copy)
// 这里写得很抽象
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;//这里是父类原型
  subClass.prototype = new F();  //创建一个空的原型赋值给父类的原型，这表示父类原型是干净的，其实这里有问题，没得必要
  subClass.prototype.constructor = subClass;//这里还需要把构造函数带到原型上

  subClass.superclass = superClass.prototype;//这里就不是很懂这个东西，前3个已经保证了原型链以及构造函数的调用
  //只需要知道继承是保证原型链就ok

  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
// ES5创建子类，继承父类
function Child(){
	this.name = "Child";
}
// ES5实例化
extend(Child,Parent);
var parent = new Parent();
parent.sayName();
var child = new Child();
child.sayName();

// ES6创建父类
class ParentES6{
	constructor(){
		this.name = "ParentES6";
	}
	sayName(){
		console.log('\nES6Name:' + this.name)
	}
}
// ES6创建子类，并继承父类
class ChildES6 extends ParentES6{
	constructor(){
		super();//es6的创建方式其实就是上面的那种完善版本，原型链继承+执行构造函数，这个构造函数就是父类的构造函数叫super
		this.name = "ChildES6";
	}
}
// ES6实例化
var parentes6 = new ParentES6();
parentes6.sayName();
var childes6 = new ChildES6();
childes6.sayName();

// prototype及__proto__.........................................
class A{
	constructor(){
		this.name="A"
	}
}
class B extends A{

}
var a = new A()
var b = new B()
console.log(a.__proto__===A.prototype)//true
console.log(B.prototype.__proto__===A.prototype)//true
console.log(a.__proto__===B.prototype.__proto__)//true
console.log(a===B.prototype)//false
//B虽继承于A，但有自己的prototype属性(原型对象)B.prototype
//a是A的实例，只依赖于A的prototype属性(原型对象)A.prototype
//如下例证：
console.log(a===b)//false
console.log(a.__proto__)//指向A.prototype
console.log(b.__proto__)//指向B.prototype

//new 的表现形式是把一个类初始化为实例，其实js并没有类的概念，只有原型链
function A(){} //这就是一个类
a = new A //这是初始化
a.__proto__ == A.prototype //这是结果
//所以其实new 就是把a.__proto__ = A.prototype而已

//创建b1
const newClass(B){
	const b1 = {}
	b1.__proto__ = B.prototype//看到这个没
	return b1
}

//创建b2
const newClass(B){
	const b2 = {}
	b2.__proto__ = B.prototype//看到这个没，再看看这个

	return b2
}

//所以b1.__proto__ ==  B.prototype，b2.__proto__ = B.prototype因为我们代码里面就是让他相等的。懂没行吧
//但是这里有毛病，因为类的有些属性不在原型上
//解释下原因，为啥c2.sayName() ==  undefined，写的函数里面没得，对，我们需要加上，我们写在函数里面是this.xxx = xxx
//执行类这个函数的话，他就会把xxx挂到this上面
//那么一个类实例话之后里面的this指向谁，实例之后指向调用它的那个对象emm这么回答也没错，但是我们一般是实例去调用
const newClass(B){
	const b1 = {}
	b1.__proto__ = B.prototype//看到这个没
	return b1
}
// 比如c = new C,那么function(){this.name = 'c'}c.name,这个this指向谁c，对，指向实例
// 所以我们要写一句话
const newClass(Class){
	const obj = {}
	obj.__proto__ = Class.prototype//看到这个没
	Class.call(obj)//然后执行了类这个构造函数,这样就可以改变this的值
	return obj
}
//但是上面的还差点，因为构造函数是需要参数的
const newClass(Class,...arg){
	const obj = {}
	obj.__proto__ = Class.prototype//看到这个没
	Class.call(obj,...arg)//这个其实就是执行构造函数，在这里面填上参数就行
	return obj
}
//第一步，创建一个新对象，然后把原型复制给新对象的__proto__,
//我这里4步，他三步
// 合并了创建新对象和赋值，这里也可以看出原型链来
//为什么会有实例的__proto__ == 类的prototype
//是因为obj.__proto__ = Class.prototype
//为什么子类的prototype.__proto__ == 父类的prototype
// 是因为
// //第一步生成子类原型
// const childPrototype = new Parent()
// //第二步，创建子类

// function Child(){
// 	this.name = "Child";
// }
// //第三步，将子类原型指向刚刚创建的原型
// Child.prototype = childPrototype
// 这里可以合并成一部 Child.prototype = new Parent(),
// 而父类的原型呢？是来自于
// Parent.prototype.sayName = function(){
//   console.log('\nES5Name:' + this.name +'\n')
// }
//这里可以写成Parent.prototype = {}//这就是一个对象，假如父类有给祖父类
//Parent.prototype =new GrandParent(),这里父类的原型就成了祖父的实例
//于是原型链就形成了
Child.prototype = new Parent//子类原型是父类实例，1
Parent.prototype = new GrandParent//父类原型是祖父实例，2
(new Child).__proto__ == Parent.prototype//子类原型的实例的__proto__可以访问的父类的原型，3
(new Parent).__proto__ == GrandParent.prototype//同理,4
Child.prototype.__proto__ = GrandParent.prototype//这个是上面的推论，因为1，2，3成立，所以这个成立，这个就是原型链
(new Parent).__proto__ == GrandParent.prototype//这个是不是和4一模一样，仔细体会下
//这个原型链就是这样一步一步证明的，只需要记住new的执行过程，以及类的继承过程，自然就可以推定出原型链