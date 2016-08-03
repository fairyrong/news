<?php
	include "database.php";
	header("Content-Type:text/html; charset=utf-8"); 
	$con = mysql_connect("localhost","root");//链接服务器

	if (!connect($con))//链接失败
  	{
  		die('Could not connect: ' .mysql_error());
	}else{
 		mysql_select_db("baidunews", $con);//连接数据库
 			
 			$newsid = $_POST['newsId'];//新闻编号
 			$newsname = $_POST['addName'];//新闻名称
 			$newsimg = $_POST['choseImg'];//新闻图片
 			$newstext = $_POST['addText'];//新闻内容
 			$newskind = $_POST['choseKind'];//新闻类型
 			$newstime = $_POST['addTime'];//添加时间
 			$newslink = $_POST['addLink'];//新闻链接
 			//SQL语句,数据库添加
 			$sql = "UPDATE news SET newstitle='".$newsname."',newsimg='".$newsimg."',newstext='".$newstext."',newslink='".$newslink."',newskind='".$newskind."',newstime='".$newstime."' WHERE newsid= '".$newsid."'";
 	 		mysql_query("set names 'utf8'");//设置为utf-8
			$result = mysql_query($sql);//执行SQL语句
			if(!$result){
				die('error:'.mysql_error());
			}
  	}
  	mysql_close($con);
?>