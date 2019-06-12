<?php
require "conn.php";//引入数据库
$result=mysql_query("select * from greemall"); //获取数据库数据
$arr=array();
for($i=0;$i<mysql_num_rows($result);$i++){ //mysql_num_rows()功能为返回结果集中行的数量
    $arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);//mysql_fetch_array — 从结果集中取得一行作为关联数组，或数字数组，或二者兼有 
}
echo json_encode($arr);