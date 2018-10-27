function test() {
	var header = {
		"Content-Type": "application/json",
	};
	var events = [{
		"sourceId": "EVET-122212-1212",
		"occurTime": "2013-04-30 11:01:05",
		"entityId": "tempHumSensor-2",
		"entityName": "中心机房2号温湿度探测点",
		"entityAddr": "10.2.30.1",
		"severity": 30,
		"name": "温度超标事件",
		"type": "overheatEvent ",
		"description": "中心机房2号温湿度探测点温度为30度，超过阈值22度。"
	}];
	var param = {
		"sysAddr": "192.168.1.20",
		"events": events
	};

	$.ajax({
		type: "POST",
		url: "create",
		headers: header,
		data: json,
		contentType: "application/json",
		success: function (data) {
			alert("data ===" + data);
			console.log("data ===" + data);
			//var result = JSON.parse(data);
		},
		error: function (e, err) {
			console.log("err==" + JSON.stringify(err));
		}
	});
}