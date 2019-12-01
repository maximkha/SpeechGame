<?php
  require '../dbconnect.php';
  $dbname = "DATABASE";
  $mysqli = new mysqli($servername,$username,$password,$dbname);
  if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
  }

  //var_dump($_POST);
  //$arrayName = array(isset($_POST["sentence"]),isset($_POST["noun"]),isset($_POST["pronoun"]),isset($_POST["verb"]),isset($_POST["adjective"]),isset($_POST["article"]),isset($_POST["adverb"]),isset($_POST["preposition"]),isset($_POST["conjunction"]),isset($_POST["interjection"]));
  //var_dump($arrayName);
  if(isset($_POST["sentence"])&&isset($_POST["noun"])&&isset($_POST["pronoun"])&&isset($_POST["verb"])&&isset($_POST["adjective"])&&isset($_POST["article"])&&isset($_POST["adverb"])&&isset($_POST["preposition"])&&isset($_POST["conjunction"])&&isset($_POST["interjection"]))
  {
    if(preg_match('/([^0-9a-z.!,\/\ ])+/i',$_POST["sentence"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["verb"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["adjective"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["article"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["adverb"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["preposition"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["conjunction"]))exit();
    if(preg_match('/([^0-9a-z.!,\/])+/i',$_POST["interjection"]))exit();

    $pre = "";
    $pre .= "'" . $_POST["sentence"] . "',";
    $pre .= "'" . $_POST["noun"] . "',";
    $pre .= "'" . $_POST["pronoun"] . "',";
    $pre .= "'" . $_POST["verb"] . "',";
    $pre .= "'" . $_POST["adjective"] . "',";
    $pre .= "'" . $_POST["article"] . "',";
    $pre .= "'" . $_POST["adverb"] . "',";
    $pre .= "'" . $_POST["preposition"] . "',";
    $pre .= "'" . $_POST["conjunction"] . "',";
    $pre .= "'" . $_POST["interjection"] . "'";

    echo "INSERT INTO `main`(`sentence`, `noun`, `pronoun`, `verb`, `adjective`, `article`, `adverb`, `preposition`, `conjunction`, `interjection`) VALUES (" . $pre . ")";

    if ($result = $mysqli->query("INSERT INTO `main`(`sentence`, `noun`, `pronoun`, `verb`, `adjective`, `article`, `adverb`, `preposition`, `conjunction`, `interjection`) VALUES (" . $pre . ")", MYSQLI_USE_RESULT)) {
      echo "Success!";
    }
  }
?>
