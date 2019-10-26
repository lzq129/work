var name = 'Global';
// ES5创建父类
function Parent() {
  this.name = "Parent";
}

Parent.prototype.sayName = function(){
  console.log('\nES5Name:' + this.name +'\n')
}

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
