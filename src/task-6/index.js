import $ from './jquery-3.4.1.slim.min.js'
import {getType} from "../task-4/index.js"//引入外部文件
import './modal.less'
window.$ = $
class Modal{
	constructor(content){
		if(getType(content)=="String"||getType(content)=="HTMLDivElement"){
			this.content = $(content)
		}else{
			console.log('只能传入选择器或者元素或者DOM字符串')
		}
		this.offsetX = 0
		this.offsetY= 0
		this.isDown = false
		this.init()
	}
	init(){
		// 初始化弹窗，遮罩层
		this.appendBox()
		$('.modal-content').html(this.content[0])
		// 将关闭按钮绑定关闭事件
		$('.modal-close').on('click',()=>{
			this.close()
		})
		// 动态获取margin-top值，达到居中对齐效果(这一步该组件可不考虑)
		this.boxHeight = -1/2*($('.modal-box').height())
		$('.modal-box').css({'margin-top':this.boxHeight + 'px'})
		// 初始化移动
		this.move()
	}
	// 添加弹窗及遮罩层
	appendBox(){
		// 遮罩层
		const max = `<div class="modal-mask"></div>`
		// 容器
		const box = `
			<div class="modal-box">
		    <div class="modal-header">
		      <div class="modal-close">X</div>
		    </div>
		    <div class="modal-content"></div>
		    <div class="modal-footer"></div>
		  	</div>`
		//插入body里面
		$('body').append($(max))
		$('body').append($(box))
	}
	// 弹出弹窗及遮罩层
	pop(){
		$('.modal-mask,.modal-box').show()
	}
	// 关闭弹窗及遮罩层
	close(){
		$('.modal-mask,.modal-box').hide()
	}
	// 移动
	move(){
		//点击鼠标
		$('.modal-header').on('mousedown',e=>{
			this.isDown = true//是否点击，true为点击状态
			// this.offsetX和this.offsetY保存鼠标点击时容器(.box)的初始位置
			this.offsetX = e.clientX - parseInt($('.modal-box').offset().left)
			this.offsetY = e.clientY - parseInt($('.modal-box').offset().top)
		})
		// 鼠标移动
		$(document).on('mousemove',e=>{	
			// 如果处于未点击状态，则不执行
			if(this.isDown == false){
				return
			}
			// 将移动时所得坐标值减去点击时坐标值，赋值给容器(.box)相应的left,top值，使之实时移动
			// 由于.box容器position:absolute,为了使之居中对齐，设置了margin-left负值，(这一步该组件可以不考虑)
			// 故此需要将margin-left,及margin-top值清空。
			$('.modal-box').css('margin-top','0')
			$('.modal-box').css('margin-left','0')
			let left = e.clientX - this.offsetX
			let top  = e.clientY - this.offsetY
			// 边界判定
			// 右边界判定，即容器left值大于等于遮罩层宽度减去容器宽度时，使left值等于右边界值。
			let rightBorder =$('.modal-mask').outerWidth(true) - $('.modal-box').outerWidth(true)
			// 同理，下边界判定即容器top值大于等于遮罩层高度减去容器高度时，使top值等于下边界值。
			let bottomBorder =$('.modal-mask').outerHeight(true) - $('.modal-box').outerHeight(true)
			if(left >= rightBorder){
				left = rightBorder
			}
			if(left <= 0){
				left = 0
			}
			if(top <= 0){
				top = 0 
			}
			if(top >= bottomBorder){
				top = bottomBorder
			}
			$('.modal-box').css({
				'left':left + 'px',
				'top' :top + 'px'
			})
		})
		// 鼠标释放
		$(document).mouseup(()=>{
			this.isDown = false//是否点击，false为未点击状态
		})
		
	}
}
const modal = new Modal('<div style="text-align:center;width:500px;height:100px;background:red">1</div>')
window.modal = modal;
modal.pop()

// 思路
// 1.头部
// 2.尾部
// 3.遮罩层
// 4.点击
// 5.移动
// 6.关闭