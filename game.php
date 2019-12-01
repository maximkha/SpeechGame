<?php
  require '../dbconnect.php';
  $dbname = "DATABASE";

  $rowOrder = array("sentence","noun","pronoun","verb","adjective","article","adverb","preposition","conjunction","interjection");

   header("Access-Control-Allow-Origin: *");

  $mysqli = new mysqli($servername,$username,$password,$dbname);
  if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
  }

  if ($result = $mysqli->query("SELECT * FROM main ORDER BY RAND()", MYSQLI_USE_RESULT)) {
    $jsonObj = array();
    $availablePartSpeech = array();
    $row = $result->fetch_row();

    for ($i=0; $i < count($row); $i++) if($row[$i]!="N/A") $availablePartSpeech[] = $rowOrder[$i];
    //print_r($availablePartSpeech);

    unset($availablePartSpeech[array_search("sentence",$rowOrder)]);
    $availablePartSpeech = array_values($availablePartSpeech);

    $possibleAnswers = arrayCopy($availablePartSpeech);
    $randPartSpeech = array_rand($availablePartSpeech, 1);
    $jsonObj["correctAnswer"] = $possibleAnswers[$randPartSpeech];
    //print_r($possibleAnswers);
    unset($possibleAnswers[$randPartSpeech]);
    $possibleAnswers = array_values($possibleAnswers);
    //print_r($possibleAnswers);
    array_unshift($possibleAnswers, $jsonObj["correctAnswer"]);
    $jsonObj["possibleAnswers"] = array_splice(array_unique($possibleAnswers), 0, 5);
    shuffle($jsonObj["possibleAnswers"]);
    $jsonObj["sentence"] = $row[0];
    //echo $row[array_search($jsonObj["correctAnswer"],$rowOrder)];
    $bpos = strpos($row[0], $row[array_search($jsonObj["correctAnswer"],$rowOrder)]);
    $epos = strlen($row[array_search($jsonObj["correctAnswer"],$rowOrder)])+$bpos;
    //echo my_substr_function($jsonObj["sentence"], $bpos, $epos);
    $jsonObj["ub"] = $bpos;
    $jsonObj["ue"] = $epos;
    echo json_encode($jsonObj);
  }

  function arrayCopy( array $array ) {
      $result = array();
      foreach( $array as $key => $val ) {
          if( is_array( $val ) ) {
              $result[$key] = arrayCopy( $val );
          } elseif ( is_object( $val ) ) {
              $result[$key] = clone $val;
          } else {
              $result[$key] = $val;
          }
      }
      return $result;
  }


  function my_substr_function($str, $start, $end)
  {
    return substr($str, $start, $end - $start);
  }
?>
