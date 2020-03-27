<html>
    <head><title>Upload rosa</title></head>
<body>

<?php 
$team = $_POST["team"];
$path = "formazioni/" . $team . ".txt";
$file = fopen($path, "w");
fwrite($file, $team."\n");

$tattica = $_POST["tattica"] . "\n";
fwrite($file, $tattica);

fwrite($file, "\n");

$pos = array("GK", "DF", "MF", "FW");
foreach ($pos as $p) {
    for ($i=0; $i<=5; $i++) {
        $el = $p . $i;
        if (isset($_POST[$el])) {
            $t = $p . " " . $_POST[$el] . "\n";
            fwrite($file, $t);
        }
    }
}

fwrite($file, "\n");

for ($i=0; $i<=5; $i++) {
    $pos = "p_pos_" . $i;
    $gio = "p_gio_" . $i;
    if (isset($_POST[$pos]) and isset($_POST[$gio])) {
        $t = $_POST[$pos] . " " . $_POST[$gio] . "\n";
        fwrite($file, $t);
    }
}

fwrite($file, "\n");

$el = "PK:0";
if (isset($_POST[$el])) {
    $t = "PK: " . $_POST[$el] . "\n";
    fwrite($file, $t);
}

if (isset($_POST["n_tat"])){
    $num_tat = $_POST["n_tat"];
    for ($i=0; $i<$num_tat; $i++) {
        $s = "";
        for ($j=0; $j<10; $j++) {
            $el = "tal" . $i . $j;
            if (isset($_POST[$el])) {
                if ($j == 4) {
                    $s = $s . "IF ";
                }
                if ($_POST[$el] != "---") {
                    // echo $_POST[$el] . "\n";
                    $s = $s . $_POST[$el] . " ";
                }
            }
        }
        if ($s != "") {
            fwrite($file, $s . "\n");
        }
    }
}

fclose($file);
echo "La rosa è stata salvata correttamente.<br><br>";
echo "By P4T4T4 & C4P0";
?>

</body>
</html>