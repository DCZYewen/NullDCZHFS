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
		}
		else if (xmlhttp.readyState==3 || xmlhttp.readyState==2 || xmlhttp.readyState==1 || xmlhttp.readyState==0){
			//pass
		}
		else{
			alert("ERROR IN FETCHING INFO");
		}
	}
}