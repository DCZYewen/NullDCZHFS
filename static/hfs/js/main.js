var page_url = 'file.nullcat.cn'
var protocol = window.location.protocol;
var file_path = '/'

function get_file_list(){
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "/ajax/list?path=" + file_path,true);
	xmlhttp.send()
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("div1").innerHTML=xmlhttp.responseText;
		}
	}
}