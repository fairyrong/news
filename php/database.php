<?php
	//header("Content-Type:application/json; charset=utf-8");
	function connect($con){
		if (!$con)
  		{
  			die('Could not connect: ' .mysql_error());
  			return false;
		}else{
 			mysql_select_db("baidunews", $con);//连接数据库	
 			return true;
  		}
	}
	//mysql_close($con);
?>
