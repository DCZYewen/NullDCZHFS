var page_host = window.location.host;
var protocol = window.location.protocol;
var page_url = window.location.href;
var file_path = 'static/';

 function get_file_list(){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/ajax/getInfo?path=" + file_path ,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var jqJsonOBJ = $.parseJSON(xmlhttp.responseText)
			if (jqJsonOBJ.error == true){
				alert("REQUESTING PATH ERROR")
			}
			else {//this branch displays the file list
				for (var n in jqJsonOBJ.data){
					console.log(jqJsonOBJ.data[n]);
					
					var thow = pushRow(jqJsonOBJ.data[n]);
					$("tbody").append(thow);
				}
			};
			
		}
		else if (xmlhttp.readyState==3 || xmlhttp.readyState==2 || xmlhttp.readyState==1 || xmlhttp.readyState==0){
			//pass
		}
		else{
			alert("ERROR IN FETCHING INFO");
		}
	}
}

function formatFileSize(fileSize) {//格式化文件大小的函数
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < (1024*1024)) {
        var temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
    } else if (fileSize < (1024*1024*1024)) {
        var temp = fileSize / (1024*1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
    } else {
        var temp = fileSize / (1024*1024*1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
    }
}

function pushRow(json){
	var row = document.createElement('tr'); //创建行
	
	if (json.typ == 'dir'){
		var nameCell = document.createElement('td'); //创建第一列id
		nameCell.innerHTML = makePath(json.name); //填充数据 点击跳转
		row.appendChild(nameCell); //加入行  ，下面类似

		var sizeCell = document.createElement('td');
		sizeCell.innerHTML = '4Kb';
		row.appendChild(sizeCell);

		var dateCell = document.createElement('td');
		dateCell.innerHTML = 'N/A';
		row.appendChild(dateCell);
	}
	else{
		var nameCell = document.createElement('td'); //创建第一列id
		nameCell.innerHTML = makeDown(json.name); //填充数据 点击下载
		row.appendChild(nameCell); //加入行  ，下面类似

		var sizeCell = document.createElement('td');
		sizeCell.innerHTML = formatFileSize(json.size);
		row.appendChild(sizeCell);

		var dateCell = document.createElement('td');
		dateCell.innerHTML = json.mtime;
		row.appendChild(dateCell);
	}

	var typeCell = document.createElement('td');
	typeCell.innerHTML = json.typ;
	row.appendChild(typeCell);

	return row;
}

function makeDown(name){
	return "<a href='" + protocol + '//' + page_host + '/' + name + "'>" + name + '</a>';
}

function makePath(name){
	return "<a href='" + page_url + '?path=' + name + "/'>" + name + '</a>';
}