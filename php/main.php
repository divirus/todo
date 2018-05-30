<?php

$host        = "host=localhost";
$port        = "port=5432";
$dbname      = "dbname=todo";
$credentials = "user=postgres password=postgres";
$db = pg_connect( "$host $port $dbname $credentials"  ) ;

$type = $_GET["type"];

if ($type === "getTasks")
{
  $query = "select t.*, st.* from tasks t left join status st on t.status = st.id_status";
  $result = pg_query($db, $query);
  //$res = [];
  $res = pg_fetch_all($result);
  // while ($row = pg_fetch_all($result)) {
  //     $res = [
  //       'date_add'      => $row['date_add'],
  //       'date_refresh'  => $row['date_refresh'],
  //       'active'        => $row['active'],
  //       'header'        => $row['header'],
  //       'tag'           => $row['tag'],
  //       'date_end'      => $row['date_end'],
  //       'id_status'     => $row['status'],
  //       'status'        => $row['status_name'],
  //       'id_task'       => $row['id_task']
  //     ];
  // }

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getTaskDetail")
{
  $id_task = $_GET["id_task"];
  $query = "select * from tasks_detail where id_task = " . $id_task . "order by id";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);
  // while ($row = pg_fetch_array($result)) {
  //     $res = [
  //       'id'            => $row['id'],
  //       'id_task'       => $row['id_task'],
  //       'name'          => $row['name'],
  //       'date_refresh'  => $row['date_refresh'],
  //       'done'          => $row['done'],
  //     ];
  // }

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getArchivedTask")
{
  $query = "select * from tasks_detail where active = 0";
  $result = pg_query($db, $query);
  $res = [];
  while ($row = pg_fetch_array($result)) {
      $res = [
        'date_add'      => $row['date_add'],
        'date_refresh'  => $row['date_refresh'],
        'active'        => $row['active'],
        'header'        => $row['header'],
        'tag'           => $row['tag'],
        'date_end'      => $row['date_end'],
        'status'        => $row['status'],
        'id_task'       => $row['id_task']
      ];
  }

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getStatus")
{
  $query = "select * from status";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getCategory")
{
  $query = "select * from category";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getTags")
{
  $query = "select * from tags";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "addTask")
{
  print_r('<pre>'.var_dump($_POST).'</pre>');
  // $date_add = $_GET["taskDateStart"];
  // $header = $_GET["taskname"];
  // $tag = $_GET["taskTags"];
  // $status = $_GET["taskStatus"];
  // $id_category = $_GET["taskCategory"];
  //
  // $query = "INSERT INTO tasks (date_add, active, header, tag, status, id_category)
  //           VALUES (" . $date_add . ", 1, ". $header .", ". $tag .", ". $status .", ". $id_category .")";
  // $result = pg_query($db, $query);
}
