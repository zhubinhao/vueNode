/**
 * 去除字符串两头的空格
 * @param {*} res 
 */
export const trim = res => {
    return res.replace(/(^\s*)|(\s*$)/g, ""); 
}
/**
 * 冒泡排序(倒序)
 * @param {*} arr 排序数组
 * @param {*} key 根据什么排序
 */
export const sort= (arr,key)=>{
    for(var i = 0;i <arr.length-1 ;i++){
        for(var j = 0 ;j<arr.length-i -1;j++){
           if(arr[j][key]<arr[j+1][key]){
             var swap = arr[j+1];
             arr[j+1]=arr[j]
             arr[j]=swap
           }
        }
      }
}


export default {
    trim,
    sort
}
