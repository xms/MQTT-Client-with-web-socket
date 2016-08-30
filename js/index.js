// 顯示訊息
function addMsg(type, msg){
	$("#msg").prepend(
		"<div class='msg "+ type.toLowerCase() +"'>[" + type + "] " + new Date().toLocaleString() + "： " + msg +"</div>"
	);
}

// 清除全部訊息
function clearMsg(){
	$("#msg").empty();
}

// 清除表單
function clearForm(fmId){
	$('#' + fmId).trigger("reset");
}

