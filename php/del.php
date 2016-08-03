<?php
	include "database.php";
	header("Content-Type:text/html; charset=utf-8"); 
	$con = mysql_connect("localhost","root");//链接服务器

	if (!connect($con))//链接失败
  	{
  		die('Could not connect: ' .mysql_error());
	}else{
 		mysql_select_db("baidunews", $con);//连接数据库
 			
 			$newsid = $_POST['id'];
 			$sql = "DELETE FROM news WHERE newsid= '".$newsid."'";
 	 		mysql_query("set names 'utf8'");//设置为utf-8
			$result = mysql_query($sql);//执行SQL语句
			if(!$result){
				die('error:'.mysql_error());
			}
  	}
  	mysql_close($con);
?>