var name = 'Global'
var context = {
    name:'context',
    whoami1: function(){
        console.log(this.name)
    },
    whoami2: ()=>{
        console.log(this.name)
    }
}
var context1 = {
    name:'context1'
}
context.whoami1()
context.whoami2()
var whoami1 = context.whoami1
whoami1()
