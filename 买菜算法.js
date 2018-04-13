/*							
描述：
鱼肉5块钱一斤，只剩1.5斤，
猪肉5.5元一斤，只剩1.8斤.
牛肉6.7元一斤，只剩3.4斤.
羊肉7.3一斤，只剩5.7斤.
龙虾9.2一斤，只剩20斤.
我现在有89元钱，我要买最重的肉.最多能买多少斤.精确到小数点后两位
*/

//输入json的格式为
let data={
	totleMoney:89,
	datas:[
	{name:"鱼肉",price:5,wieght:1.5}, //鱼肉5块钱一斤，只剩1.5斤，以下类比
	{name:"羊肉",price:7.3,wieght:5.7},
	{name:"龙虾",price:9.2,wieght:20},
	{name:"猪肉",price:5.5,wieght:1.8},
	{name:"牛肉",price:6.7,wieght:3.4},
	],
}

//一个按照对象数组中对象某个字段排序的算法（升序）
function compare(property){ //property为排序依据字段
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
//计算最终结果方法
function method(data){
	//获取总共的钱
	var totleMoney=data.totleMoney;
	//获取具体数据
	var datas=data.datas;
	//将具体数据按照价格由高到低升序排序
	datas.sort(compare('price'));
   //定义承载最大重量，具体重量的变量
   var maxWeight=0;
   var allWeight=[];
   //开始具体的运算
   for(var i=0;i<datas.length;i++)
   {
	   //先计算全部买最低价格的肉是否能把钱花完？若不能，直接返回这个所买重量】若能，继续买下一中价格稍贵的肉
	   var w1=totleMoney/datas[i].price;//手上的钱买当前肉所能买的重量
	   
	   if(w1<=datas[i].wieght) 
	   {
		   maxWeight=maxWeight+w1;//说明能不买完，得到最大重量,退出循环。
		   allWeight.push({name:datas[i].name,price:datas[i].price,wieght:w1});//记录各种肉所买重量
		   break;
	   }
	   else //能买完，开始买第二种肉
	   {
		   w1=datas[i].wieght;//钱多，把价格最低的肉全买了
		   //剩余的钱
		   totleMoney=totleMoney-w1*datas[i].price;
		   //开始累计重量
		   maxWeight=maxWeight+w1;
		   //记录各种肉所买重量
		   allWeight.push({name:datas[i].name,price:datas[i].price,wieght:w1});
	   }
	   
   }
   console.info("最大重量为："+maxWeight.toFixed(2));//保留两位小数
   console.info("各种肉各买斤数为：");
   console.info(allWeight);
   return maxWeight.toFixed(2);
}

method(data);//执行运算
