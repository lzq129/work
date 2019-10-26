class Timer{
	constructor(time){

	}
	nextTick(callback){

	}
	start(){

	}
	pause(){

	}
	stop(){

	}
}

const timer = new Timer(100)
timer.nextTick(time=>{
	console.log('当前倒计时：',time)
})
timer.start()
timer.pause()
timer.stop()

const getType = (param) => {

}

getType([]) == '数组'//true
getType([]) == '对象'//true
getType([]) == '数字'//true
getType([]) == '字符'//true
getType([]) == 'null'//true
getType([]) == 'undefined'//true
getType([]) == 'bool'//true