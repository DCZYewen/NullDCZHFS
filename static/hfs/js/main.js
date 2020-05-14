var page_url = 'file.nullcat.cn';
var protocol = window.location.protocol;
var file_path = 'static/';

 function get_file_list(){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/ajax/getInfo?path=" + file_path ,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById("div1").innerHTML=xmlhttp.responseText;
			var jqJsonOBJ = $.parseJSON(xmlhttp.responseText)
			if (jqJsonOBJ.error == true){
				alert("REQUESTING PATH ERROR")
			}
			else {//this branch displays the file list
				for (var n in jqJsonOBJ.data){
					console.log(jqJsonOBJ.data[n]);

					var row = document.createElement('tr'); //创建行


					var nameCell = document.createElement('td'); //创建第一列id
					nameCell.innerHTML = jqJsonOBJ.data[n].name; //填充数据
					row.appendChild(nameCell); //加入行  ，下面类似
					
					if (jqJsonOBJ.data[n].typ == 'dir'){
						var sizeCell = document.createElement('td');
						sizeCell.innerHTML = '4Kb';
						row.appendChild(sizeCell);

						var dateCell = document.createElement('td');
						dateCell.innerHTML = 'N/A';
						row.appendChild(dateCell);
					}
					else{
						var sizeCell = document.createElement('td');
						sizeCell.innerHTML = formatFileSize(jqJsonOBJ.data[n].size);
						row.appendChild(sizeCell);

						var dateCell = document.createElement('td');
						dateCell.innerHTML = jqJsonOBJ.data[n].mtime;
						row.appendChild(dateCell);
					}

					var typeCell = document.createElement('td');
					typeCell.innerHTML = jqJsonOBJ.data[n].typ;
					row.appendChild(typeCell);
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