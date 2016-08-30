const MQTT_HOST = "ws://192.168.16.160:18888/";
const SUB_TOPIC = "TEST_TOPIC";
const PUB_TOPIC = "TEST_TOPIC";
 
var options = {
	onSuccess:onConnect,
	onFailure:doFail
}

/*------------------------------------------------------------------------------------------------------*/


var client = false;

// 成功連接 broker
function onConnect() {
	addMsg("connection", "Connect success. (" + MQTT_HOST + ")" );
    client.subscribe(SUB_TOPIC);
}

// 收到訊息
function onMessageArrived(message) {
    addMsg("receive", message.payloadString);
}

// 發佈訊息
function publish_message() {
	var txtQuery = $("#query").val();
    var message = new Paho.MQTT.Message(txtQuery);
    message.destinationName = PUB_TOPIC;
    client.send(message);
    clearForm("fm");
	addMsg("send", txtQuery);
}

// 錯誤
function doFail(e){
    addMsg("error", "Fail:" + e.errorMessage);
}

// 斷線
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
	  addMsg("error", "Connect lost:" + responseObject.errorMessage);
	}
}


function init() {
    client = new Paho.MQTT.Client( MQTT_HOST, "web_" + parseInt(Math.random() * 100, 10) );
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

    client.connect(options); // 連接 MQTT broker
}

window.addEventListener('load', init, false);
//document.addEventListener('DOMContentLoaded', init, false);