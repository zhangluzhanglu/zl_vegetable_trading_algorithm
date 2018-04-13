/*
我现在有11斤牛肉，
张三愿意出9块一斤买走1.3斤。
李四愿意出6块钱一斤，买走2.1斤，
王五愿意出5.8一斤，买走2.5斤，
赵六愿意出5.1一斤，买走20斤，，
那么算下来，，我总共能卖出多少钱。
*/


//输入json的格式为
let data={
	totleWeight:11, 
	datas:[
	{name:"张三",price:9,wieght:1.3}, //解释：张三愿出9元一斤买走1.3斤（以下类比）
	{name:"王五",price:5.8,wieght:2.5},
	{name:"赵六",price:5.1,wieght:20},
	{name:"李四",price:6,wieght:2.1},
	],
}

//一个按照对象数组中对象某个字段排序的算法（降序）
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return -(value1 - value2);
    }
}

//计算最终结果方法
function method(data){
	//获取总共的重量
	var totleWeight=data.totleWeight;
	//获取具体数据
	var datas=data.datas;
	//将具体数据按照出价最贵的由高到低降序排序
	datas.sort(compare('price'));
   //定义承载最大钱数，每人买的重量
   var maxMoney=0;
   var allWeight=[];
   //开始具体的运算
   for(var i=0;i<datas.length;i++)
   {
	   //算法：先把肉全部卖给价格最高的那个人，看他是否能买完？若能，则全部卖给他，得到最大钱数】若不能，开始买个出价第二高的人
        
		if(datas[i].wieght>=totleWeight) //如果价高者能把肉全部买完，则直接得到最大钱数，循环结束
		{
			maxMoney=maxMoney+totleWeight*datas[i].price;
			allWeight.push({name:datas[i].name,price:datas[i].price,wieght:totleWeight});//记录每人各买重量
			break;
		}
		else //出价高的人不能买完，让出价稍次的人再买
		{
			//得到剩余重量
			totleWeight=totleWeight-datas[i].wieght;
			//累计所卖钱数
			maxMoney=maxMoney+datas[i].wieght*datas[i].price;
			//记录每人各买重量
			allWeight.push({name:datas[i].name,price:datas[i].price,wieght:datas[i].wieght});
		}
	   
   }
   console.info("所卖钱数总和为："+maxMoney.toFixed(2));//保留两位小数
   console.info("卖给每人斤数为");
   console.info(allWeight);
}

method(data);//执行运算
