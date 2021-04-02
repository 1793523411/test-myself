/**
 * 在这里写代码以获得语法提示
 */
function itor(array){
    let index = 0;
    return {
        next:function(){
            if(index < array.length){
                return {value:arr[index++],done:false}
            }else{
                return {value:undefined,done:true}
            }
        }
    }
}