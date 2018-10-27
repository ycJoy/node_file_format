# node_file_format
 format  html、js、css using js-beautify
 
1、程序解决的问题：递归格式化文件夹中的css、html、js 代码
	许多在线工具、包括编辑器如vscode都提供代码格式化功能，但是只能一个文件一个文件的操作，此程序通过遍历文件夹，递归的格式化文件夹中的每个文件。
	
2、安装 js-beautify  模块
	npm install js-beautify
	
3、修改需要格式化的文件夹目录
	//解析需要遍历的文件夹
	var filePath = path.resolve('./in');
	
4、执行程序
	node foderFileFormat.js
