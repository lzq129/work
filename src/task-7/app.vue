<template>
	<div>
		<div class="result">结果展示</div>
		<textarea v-model="text" v-show="!isSave"></textarea>
		<span v-show="isSave">{{text}}</span>
		<button @click="edit">编辑</button>
		<button v-show="!isSave" @click="clear">清空</button>
		<button v-show="!isSave" @click="preview">预览</button>
		<button @click="save">保存</button>
	</div>
</template>
<script>
	export default {//导出模块
		data(){
			return {
				isSave: false,
				text:''
			}
		},
		// 实例化完成后，最早能操作data的函数
		created(){
			if(localStorage.getItem('text')!=null){
				this.isSave=true,
				this.text=localStorage.getItem('text')
			}
		},
		// 自定义方法
		methods:{
			clear(){
				this.text=''
			},
			preview(){
				this.isSave = true
			},
			edit(){
				this.isSave = false
			},
			save(){
				this.isSave = true
				// 本地储存，长期。setItem储存，getItem获取
				localStorage.setItem('text',this.text)
			}
		}
	}
</script>
<style lang="less">
body{
	.result{
		color: red;
	}
}
</style>
