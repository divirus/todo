<?php

$host        = "host=localhost";
$port        = "port=5432";
$dbname      = "dbname=todo";
$credentials = "user=postgres password=postgres";
$db = pg_connect( "$host $port $dbname $credentials"  ) ;

$type = $_GET["type"];

if ($type === "getTasks")
{
  $query = "select t.*, st.*, ct.* from tasks t
            left join status st on t.status = st.id_status
            left join category ct on t.id_category = ct.id_category";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getTaskDetail")
{
  $id_task = $_GET["id_task"];
  $query = "select td.*, t.tag from tasks_detail td left join tasks t on t.id_task = td.id_task where td.id_task = " . $id_task . "order by id";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getTaskHistory")
{
  $id_task = $_GET["id_task"];
  $query = "SELECT id, id_task, history, date FROM task_history where id_task = " . $id_task;
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

  echo json_encode($res, JSON_UNESCAPED_UNICODE);
}

if ($type === "getChartData")
{
  $query = "select coalesce(o.open, 0) as open, coalesce(d.done, 0) as done, coalesce(ov.overdue, 0) as overdue, t.date_refresh as date
            from tasks t
            left join (SELECT count(1) as open, date_refresh FROM tasks where status = 1 group by date_refresh) o on t.date_refresh = o.date_refresh
            left join (SELECT count(1) as done, date_refresh FROM tasks where status = 2 group by date_refresh) d on t.date_refresh = d.date_refresh
            left join (SELECT count(1) as overdue, date_refresh FROM tasks where status = 3 group by date_refresh) ov on t.date_refresh = ov.date_refresh
            group by o.open, d.done, ov.overdue,t.date_refresh";
  $result = pg_query($db, $query);
  $res = pg_fetch_all($result);

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
  $date_add = $_POST["taskDateStart"];
  $header = $_POST["taskName"];
  $tag = $_POST["taskTags"];
  $status = $_POST["taskStatus"];
  $id_category = $_POST["taskCategory"];
  $active = 1;
  $query = "INSERT INTO tasks (date_add, active, header, tag, status, id_category) VALUES ('$date_add', '$active', '$header', '$tag', '$status', '$id_category') RETURNING id_task";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $row = pg_fetch_row($result);
  $new_id = $row[0];
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$new_id', 'Задача создана');";
  $result = pg_query($db, $query);
}

if ($type === "addDetailTask")
{
  $id_task = $_POST["id_task"];
  $name = $_POST["name"];
  $query = "INSERT INTO tasks_detail (id_task, name) VALUES ('$id_task', '$name')";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $history = 'Добавлен пункт - ' . $name;
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$id_task', '$history')";
  $result = pg_query($db, $query);
}

if ($type === "updateTaskStatus")
{
  $id_task = $_POST["id_task"];
  $checked = $_POST["checked"];
  $query = "UPDATE tasks
            SET done = CASE WHEN done is null THEN 1 ELSE NULL END,
                status = CASE WHEN status = 1 THEN 2 WHEN status = 2 THEN 1 END,
                date_refresh = current_date
            WHERE id_task = '$id_task' RETURNING done, header";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $row = pg_fetch_row($result);
  $done = $row[0];
  $header = $row[1];
  if ($done)
  {
    $history = 'Выполнена задача - ' . $header;
  } else {
    $history = 'Задача снова активна - ' . $header;
  }
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$id_task', '$history')";
  $result = pg_query($db, $query);
}

if ($type === "updateTaskDetailStatus")
{
  $id = $_POST["id"];
  $checked = $_POST["checked"];
  $query = "UPDATE tasks_detail
            SET done = CASE WHEN done is null THEN 1 ELSE NULL END,
            date_refresh = current_date
            WHERE id = '$id' RETURNING id_task, done, name";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $row = pg_fetch_row($result);
  $id_task = $row[0];
  $done = $row[1];
  $name = $row[2];
  if ($done)
  {
    $history = 'Выполнен пункт - ' . $name;
  } else {
    $history = 'Снята отметка с пункта - ' . $name;
  }
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$id_task', '$history')";
  $result = pg_query($db, $query);
}

if ($type === "deleteTask")
{
  $id_task = $_GET["id_task"];
  $query = "DELETE FROM tasks_detail WHERE id_task = '$id_task'; DELETE FROM tasks where id_task = '$id_task' RETURNING header";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $row = pg_fetch_row($result);
  $header = $row[0];
  $history = 'Удалена задача - ' . $header;
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$id_task', '$history')";
  $result = pg_query($db, $query);
}

if ($type === "deleteTaskDetail")
{
  $id_task_detail = $_GET["id_task_detail"];
  $query = "DELETE FROM tasks_detail WHERE id = '$id_task_detail' RETURNING name, id_task";
  $result = pg_query($db, $query);
  //Добавляем событие в историю
  $row = pg_fetch_row($result);
  $name = $row[0];
  $id_task = $row[1];
  $history = 'Удален пункт - ' . $name;
  $query = "INSERT INTO task_history(id_task, history) VALUES ('$id_task', '$history')";
  $result = pg_query($db, $query);
}
