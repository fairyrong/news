<?php
	include "database.php";

	header("Content-Type:application/json; charset=utf-8");
	$con = mysql_connect("localhost","root");//登陆

	if (!connect($con))//调用连接函数，连接失败
  	{
  		die('Could not connect: ' .mysql_error());
	}else{
 		mysql_select_db("baidunews", $con);//连接数据库
 		mysql_query("set names 'utf8'");//设置为utf-8
 		$kind=$_GET["kind"];//从前台获取类别
 		//SQL语句
 		if($kind == '所有'){
 			$result = mysql_query("SELECT * FROM `news`");
 		}else{
 			$result =mysql_query("SELECT * FROM `news` WHERE `newskind`='".$kind."'");
 		}
		//如果查询结果为空
		if(mysql_num_rows($result)==''){
			$data = "blank";
		}else{
			$news = array();
			while($row = mysql_fetch_array($result))//逐行显示
	 		{
  				array_push($news,array("newsid"=>$row['newsid'], "newskind"=>$row['newskind'], "newstitle"=>$row['newstitle'] , "newsimg"=>$row['newsimg'] , "newstext"=>$row['newstext'] , "newslink"=>$row['newslink'] ,"newstime"=>$row['newstime']));
  			}
  		 	$data = json_encode($news,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);//json格式化输出
		}
  		echo $data;
  	}
  	mysql_close($con);
?>

