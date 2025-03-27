<?php

    // Respond with the updated data
    header('Content-Type: application/json');
    // header('Content-Type: text/html');

    
    // File path to the todo JSON file
    $file = 'todo.json';

    // Check the request method
    if (file_exists($file)) {
        $json_data = file_get_contents($file);
        $todos = json_decode($json_data, true);
    } else {
        $todos = [];
    }

    // Füge einen neuen Eintrag hinzu
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $input = json_decode(file_get_contents('php://input'), true);
        $todos[] = $input['todo'];
        file_put_contents($file, json_encode($todos));
        echo json_encode(['status' => 'success']);
        exit;
    }

    // Rückgabe der TODOs
    echo json_encode($todos);

?>