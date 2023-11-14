<?php
    include("connection.php");

    $sql = "SELECT * FROM levels";
    $result = $conn->query($sql);

    $levels = array();
    while ($row = $result->fetch_assoc()) {
        $levels[] = $row;
    }

    echo json_encode($levels);

    $conn->close();
?>