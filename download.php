<html>
    <head><title>Download rose</title></head>
<body>
    <h2>Formazioni</h2>
<?php 
$dir = "formazioni/";

// Sort in ascending order - this is default
$files = scandir($dir);

foreach($files as $file) {

    if ($file != "." and $file != "..") {
        $s = "<a href='" . $dir . $file . "'>" . $file . "</a><br>";
        echo $s;
    }
}
?>
</body>