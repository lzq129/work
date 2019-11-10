import {getType ,Timer} from "../task-4/index.js"//引入外部文件

class Swipr{
    //判定获取的元素是否是选择器或者元素，选择器返回"String",元素返回"HTMLDivElement"
    constructor(element, transitionTime = 2){
        if(getType(element)=='String'){
            this.element = document.querySelector(element)
        }else if(getType(element)=='HTMLDivElement'){
            this.element = element;
        }else{
            console.log('只能传入选择器或者元素')
        }
        //初始化
        this.transitionTime = transitionTime//过渡时间
        this.content = this.element.children[0]
        this.append()
        this.elementWidth = this.element.parentNode.offsetWidth
        this.itemList = this.content.children
        this.itemLength = this.itemList.length
        this.itemWidth = this.itemList[0].offsetWidth
        this.contentWidth = this.itemWidth * this.itemLength
        this.left = 0//储存获取节点的第一个元素的style.left的变量
        this.index = 0//储存dots索引值
        this.root = document.createElement('div')
        this.init()
    }
    // 事件侦听
    eventListener(event = 'click', callback = () => {}){
        this.element.addEventListener(event, callback,false);
    }
    // 初始化函数
    init(){
        this.updateStyle({
            left: 0, 
            transition: `left ${this.transitionTime}s`, 
        })
        this.createArrow('left')
        this.createArrow('right')
        this.createDots()
        this.highlight(this.index)
    }
    // 创建左右箭头并绑定侦听事件
    createArrow(float = 'left'){
        const getPrevArrow = (float = 'left',content = '&lt;') => `
        <div style='
            position:absolute;
            ${float}:10px;
            margin-top:-186px;
            color:white;
            font-size:50px;
            line-height:70px;
            width:40px;
            height:70px;
            padding:0;
            background:#afafaf;
            user-select:none;
            cursor:pointer;'>${content}
        </div>`
        this.root.innerHTML = getPrevArrow(float, float == 'left'?'&lt;':'&gt;')//写入html值
        const prevArrowDom = this.root.children[0]
        this.element.appendChild(prevArrowDom)//在获取元素里添加左右箭头
        // a = () => console.log('a')
        // b = () => a
        // b();//输出结果是"()=>console.log('a')"
        // b = () => a()
        // b();//输出结果是"a"
        // 给添加的元素绑定侦听事件
        // 使用bind()改变this指向，使this指向实例
        prevArrowDom.addEventListener('click',this[float == 'left'?'prev':'next'].bind(this),false)
    }
    createDots(){
        //动态写入data-index值，用其值代表dots索引值
        const getLiList = (index) => `
        <li data-index="${index}" style ='
            width:10px;
            height:10px;
            border-radius:50%;
            margin:0 2px;
            float:left;
            padding:0;
            background:red;
            list-style:none;
            cursor:pointer;
        '></li>
        `
        // 通过this.itemList(获取的节点的第一个元素的子元素集合)创建相应个数的dots
        const dots = Array.from(this.itemList).reduce((res,item,index) => {
            return res + (index?getLiList(index-1):'')
        },'')
        // 写入html值
        this.root.innerHTML = `<ul style="
            position:absolute;
            left:50%;
            bottom:10px;
            padding:0;
            width:${14*this.itemLength-14}px;
            margin-left:-${7*this.itemLength-7}px;
        ">${dots}</ul>`
        this.dotsList = this.root.children[0]
        this.element.appendChild(this.dotsList)//将创建的dots插入页面
        // 不推荐通过遍历li的个数为每个li添加侦听事件
        // this.li = document.getElementsByClassName('li')
        // for(let i = 0;i < this.li.length;i++){
        //     this.li[i].addEventListener('click',function(){
        //         this.content.style.left = - i * this.itemWidth + 'px'
        //         this.left = - i * this.itemWidth
        //         this.highlight(this.index,'red')
        //         this.index = i
        //         this.highlight(i,'blue')
        //     }.bind(this),false)
        // }

        // 使用事件代理，为父元素添加侦听事件，
        // 然后通过判断其子元素是否是需求类型的标签元素，来清除父元素绑定侦听事件的影响
        this.dotsList.addEventListener('click', e=>{
            const dot = e.target
            if(dot.tagName !== 'LI') return//不是需求类型就不执行
            const index = dot.dataset.index//获取data-index存储的索引值(见上方(第72行)⬆ 写入dots thml值时)
            this.content.style.left = - index * this.itemWidth + 'px'
            this.left = - index * this.itemWidth
            this.highlight(this.index,'red')//清除上一个dots的颜色值
            this.index = index//保存当前dots所在位置(即索引值)
            this.highlight(index,'blue')//改变当前位置dots颜色值
        })
    }
    append(){
        // 复制获取的节点的第一个元素的子元素的第一个值，并插入第一个元素的末尾
        this.content.appendChild(this.content.children[0].cloneNode(true));
    }
    updateStyle(style){
        // for...in...遍历style值，并相应赋值
        for(let key in style){
            this.content.style[key] = style[key]
        }
        this.content.style.width = this.contentWidth + 'px'
    }
    // 思路：通过this.left值动态储存容器的style.left的值，来达到滑动效果
    next(){
        // 让创建的dots跟随滑动一起动态显示
        this.highlight(this.index,'red')//清除上一个dots颜色值
        this.index++//索引值+1(即下一个dots位置)
        // 如果索引值大于等于子元素长度-1，那么重置this.index值，即回到初态，开始下一轮循环
        // 为方便循环，创建时复制了子元素第一个值在末尾，故此判定条件子元素长度需要减1
        if(this.index>=this.itemLength-1){
            this.index = 0
        }
        this.highlight(this.index)//当前位置dots颜色值

        // 循环条件判定如上(第141行)⬆解释
        // 如果this.left值为负的最后一个子元素的left(包含复制的子元素)相对于节点的left值，
        // 那么重置this.left值，并取消过渡效果。视觉效果是,末尾过渡到"开始"(其实是复制了第一个子元素插在末尾)，
        // 而实际上是，原本的子元素末尾向目前在末尾的复制的第一个子元素过渡。在过渡完成后，然后由于style值的重置，
        // 使原本的第一个元素与在末尾复制的子元素瞬间重合，所以循环得以再次循环
        if(this.left <= - (this.itemLength - 1) * this.itemWidth){
            this.left = 0
            this.updateStyle({left:0, transition:'none'})
        }
        setTimeout(()=>{
            // 每次减去一个子元素宽度赋值给父元素(即容器)的style.left来达到滑动效果
            this.left = this.left - this.itemWidth
            this.updateStyle({left:this.left+ 'px', transition:`left ${this.transitionTime}s`})
        })
    }
    prev(){
        this.highlight(this.index,'red')
        this.index--
        if(this.index<0){
            this.index = this.itemLength-2//循环条件减2，是因为受第一个子元素被复制在末尾的影响
        }
        this.highlight(this.index)

        // 原理与在next()中的叙述相近，不同点在于，从第一个子元素到原本末尾子元素的过渡，
        // 点击箭头的开始，便直接跳到了复制的子元素，然后执行复制的子元素到原本末尾的子元素的过渡。
        if(this.left>=0){
            this.left = this.itemWidth - this.content.offsetWidth
            this.updateStyle({left:this.left+'px', transition:'none'})
        }
        setTimeout(()=>{
            this.left = this.left + this.itemWidth
            console.log(this.left)
            this.updateStyle({left:this.left+ 'px', transition:`left ${this.transitionTime}s`})
        })
    }
    // 通过写入html的data-xindex值来改变dots的颜色值
    highlight(index,color = 'blue'){
        this.dotsList.children[index].style.background = color
    }
}
const s = new Swipr('.demo', 0.5)
const t = new Timer(7, true, 2000, false)
s.eventListener('mouseover',()=>t.stop())
s.eventListener('mouseout',()=>t.start())
t.nextTick(()=>{
    !t.prev?s.next():s.prev()
})
window.s = s;
window.t = t;
// t.start()
// 整理..............................................
// 1.函数特点：低耦合，高内聚，功能单一，可扩展性。
// 2.函数的初始化，变量的初始化，以及代码的优化。
// 3.组件特性：通过DOM，获取有效的元素属性进行操作，实现功能。
// 4.整体思路：
//  1)滑动即改变容器的style.left的值来实现，需注意容器position值应为relative。
//  2)通过复制第一个子元素作为‘桥梁’，实现循环效果，这里引入计时器实现自动循环。
//  3)箭头及dots绑定侦听事件，触发时执行相应函数，this值需指向实例
//  4)dots通过添加索引值，与获取的子元素集联系起来，通过滑动函数实现动态显示效果。