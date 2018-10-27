/*
	1、递归读取文件夹
	2、直接替换原来文件
	3、格式化  css、js、html 
*/
var fs = require('fs');
var path = require('path');
var beautify = require('js-beautify').js; //js代码格式化模块
var beautify_css = require('js-beautify').css;//css
var beautify_html = require('js-beautify').html;//html 

//解析需要遍历的文件夹
var filePath = path.resolve('./in');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            console.log(filedir);
							//文件格式过滤--格式化 处理 js css html 
							if(filename.indexOf(".js")>0 || filename.indexOf(".html")>0 || filename.indexOf(".css")>0){
								 fileFormat(filename,filedir);//格式化文件
							}
	
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}


/**
 * 文件格式化方法
 * @param fileName 需要格式化的文件名
 */

function fileFormat(filename,filedir) {
    
	fs.readFile(filedir, 'utf8', function(err, data) {
		if (err) {
			throw err;
		}
		/*
		var reault = beautify(data, {
			indent_size: 4,
			space_in_empty_paren: true
		});
		*/
		
		var formatObj = {
 		  	"html": {
			    "allowed_file_extensions": ["htm", "html", "xhtml", "shtml", "xml", "svg","aspx","jsp"],
			    "brace_style": "collapse", 
			    "end_with_newline": false,
			    "indent_char": "\t", 
			    "indent_handlebars": false,
			    "indent_inner_html": false,
			    "indent_scripts": "keep", 
			    "indent_size": 1, 
			    "max_preserve_newlines": 10, 
			    "preserve_newlines": true, 
			    "unformatted": ["a", "span", "img", "code", "pre", "sub", "sup", "em", "strong", "b", "i", "u", "strike", "big", "small", "pre", "h1", "h2", "h3", "h4", "h5", "h6"], 
			    "wrap_line_length": 0 
			  },
			  "css": {
			    "allowed_file_extensions": ["css", "scss", "sass", "less"],
			    "end_with_newline": false, 
			    "indent_char": "\t", 
			    "indent_size": 1, 
			    "newline_between_rules": true,
			    "selector_separator": " ",
			    "selector_separator_newline": false 
			  },
			  "js": {
			    "allowed_file_extensions": ["js", "json", "jshintrc", "jsbeautifyrc","csslintrc"],
			    "brace_style": "collapse",
			    "break_chained_methods": false,
			    "e4x": false, 
			    "end_with_newline": false, 
			    "indent_char": "\t",
			    "indent_level": 0, 
			    "indent_size": 1, 
			    "indent_with_tabs": true, 
			    "jslint_happy": true, 
			    "keep_array_indentation": false, 
			    "keep_function_indentation": false,
			    "max_preserve_newlines": 0, 
			    "preserve_newlines": true,
			    "space_after_anon_function": false, 
			    "space_before_conditional": true, 
			    "space_in_empty_paren": false,
			    "space_in_paren": false,
			    "unescape_strings": false, 
			    "wrap_line_length": 0 
			  }
			}	
		var result = '';
		if(filename.indexOf(".js")>0 ){//根据文件名后缀调用不同的格式化函数
			 reault = beautify(data, formatObj);
		}else if (filename.indexOf(".html")>0){
			reault = beautify_html(data,formatObj );
		}else if (filename.indexOf(".css")>0){
			reault = beautify_css(data,formatObj );
		}
		
		/*
		var reault = beautify(data, {
			indent_size: 4,
			space_in_empty_paren: true
		});
		*/
		
		//fs.writeFile('./out/'+filename, reault, {//放到新的文件夹中
		fs.writeFile(filedir, reault, {//直接替换原始文件夹中的文件
			encoding: 'utf-8'
		}, function(err) {
			if (err) {
				return console.error(err);
			}
			console.log("数据写入成功！");
		});
	});
}