// 1. create table team
//

var titles = [
    "nome",
    "età",
    "nazionalità",
    "abilità di fermare il tiro del giocatore, abilità 'portiere'",
    "abilità di affrontare il giocatore, utilizzato dai giocatori in difesa",
    "abilità di passaggio del giocatore, utilizzato dai giocatori a centrocampo, per creare opportunità",
    "abilità di tiro del giocatore, abilità di tirare in porta, utilizzato dai giocatori in attacco", 
    "aggressività del giocatore",
    "abilità portiere",
    "abilità difensore",
    "abilità centrocampista",
    "abilità attaccante",
    "quantità di partite giocate dal giocatore",
    "quantità di partite entrato come sostituto",
    "quantità di minuti giocati",
    "quante volte è stato man of the match",
    "quantità totale di salvataggi effettuati dal giocatore. Solo se il giocatore ha giocato come portiere",
    "quantità di goal subiti dal giocatore. Solo se il giocatore ha giocato come portiere",
    "quantità totale di takle chiavi che il giocatore ha fatto",
    "quantità totale di passaggi chiave effettuati dal giocatore per creare opportunità di goal",
    "quantità totale di tiri in porta effettuati dal giocatore",
    "quantità totale di goal segnati dal giocatore",
    "quantità totale di assist effettuati dal giocatore",
    "ammontare totale dei punti disciplinari accumulati dal giocatore. I punti disciplinari (DP) vengono 'accumulati' quando il giocatore riceve i cartellini giallo / rossi",
    "se un giocatore non è infortunato, Inj è 0. Se un giocatore è infortunato, indica il numero di partite che non può giocare",
    "se un giocatore non è attualmente sospeso, Sus è 0. Se un giocatore è sospeso, indica la quantità di giochi che non può giocare"
]

var create_table_team = function(team) {
    var team_table = document.getElementById("teamtable");
    var url = "http://fantaasd.altervista.org/rose/" + team + ".txt";
    console.debug(url);
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    
    file = xmlHttp.responseText;
    console.debug(typeof file);
    
    // By lines
    var lines = file.split('\n');
    for(var line = 0; line < lines.length; line++){
        //   console.log(lines[line]);
        
        if (line == 0) {
            tr = document.createElement('tr');
            var els = lines[line]
            .trim()
            .replace(/\s+/g, " ")
            .split(" ");
            
            for(var i=0; i<els.length; i++){
                // console.log(els[i])
                th = document.createElement('th');
                th.textContent = els[i];
                th.title = titles[i];
                tr.appendChild(th);
            }
            team_table.appendChild(tr);
        } else if (line > 1) {
            tr = document.createElement("tr");
            var els = lines[line]
            .trim()
            .replace(/\s+/g, " ")
            .split(" ");
            
            for (var i = 0; i < els.length; i++) {
                if (i == 0) {
                    players_name.push(els[i]);
                }
                // console.log(els[i])
                td = document.createElement("td");
                td.textContent = els[i];
                tr.appendChild(td);
            }
            team_table.appendChild(tr);
        }
    }
};
var num_sels = 0;
var sel_values = [];

var create_element = function(type, num) {
    var div = document.createElement("div");
    var el = document.createElement("label");
    el.innerHTML = type
    el.style.paddingRight = "20px";
    div.appendChild(el)
    
    var sel = document.createElement("select");
    sel.id = "sel_" + num_sels;
    sel.name = type + num;
    
    var opt = document.createElement("option");
    opt.textContent = '---';
    opt.value = '---';
    sel_values.push('---');
    sel.appendChild(opt);
    
    for (var i=0; i<players_name.length; i++) {
        var opt = document.createElement("option");
        opt.textContent = players_name[i];
        opt.value = players_name[i];
        sel.appendChild(opt);
    }
    div.appendChild(sel);
    num_sels++;
    return div
}

var create_panch = function() {
    var div = document.createElement("div");
    
    for (var j=0; j<5; j++){
        var sel = document.createElement("select")
        sel.style.paddingRight = "20px";
        sel.name = "p_pos_" + j;
        
        var opt = document.createElement("option");
        opt.textContent = "---";
        opt.value = "---";
        sel.appendChild(opt);
        var opt = document.createElement("option");
        opt.textContent = "GK";
        opt.value = "GK";
        sel.appendChild(opt);
        var opt = document.createElement("option");
        opt.textContent = "DF";
        opt.value = "DF";
        sel.appendChild(opt);
        var opt = document.createElement("option");
        opt.textContent = "MF";
        opt.value = "MF";
        sel.appendChild(opt);
        var opt = document.createElement("option");
        opt.textContent = "FW";
        opt.value = "FW";
        sel.appendChild(opt);
        
        div.appendChild(sel);
        
        var sel = document.createElement("select");
        sel.name = "p_gio_" + j;
        var opt = document.createElement("option");
        opt.textContent = "---";
        opt.value = "---";
        sel.appendChild(opt);
        
        for (var i = 0; i < players_name.length; i++) {
            var opt = document.createElement("option");
            opt.textContent = players_name[i];
            opt.value = players_name[i];
            sel.appendChild(opt);
        }
        div.appendChild(sel);
        div.appendChild(document.createElement("br"))
    }
    
    return div;
}

var create_separator = function() {
    var sep = document.createElement("hr")
    sep.style.width = "100%";
    sep.style.color = "lightgray";
    return sep;
}

var create_select_tactic = function() {
    var sel = document.createElement("select");
    
    var opt = document.createElement("option");
    opt.textContent = "N"
    sel.appendChild(opt);
    var opt = document.createElement("option");
    opt.textContent = "D";
    sel.appendChild(opt);
    var opt = document.createElement("option");
    opt.textContent = "A";
    sel.appendChild(opt);
    var opt = document.createElement("option");
    opt.textContent = "P";
    sel.appendChild(opt);
    var opt = document.createElement("option");
    opt.textContent = "C"
    sel.appendChild(opt);
    var opt = document.createElement("option");
    opt.textContent = "L";
    sel.appendChild(opt);
    
    return sel;
}

var create_tactic = function() {
    var div = document.createElement("div");
    var el = document.createElement("label");
    el.innerHTML = "Tattica";
    el.style.paddingRight = "20px";
    div.appendChild(el);
    
    var sel = create_select_tactic();
    sel.name = "tattica";
    
    div.appendChild(sel);
    
    return div;
}

var insert_formation = function(module) {
    var p = 1,
    d,
    c,
    a;
    
    console.debug(module);
    if (module == "343") {
        d = 3;
        c = 4;
        a = 3;
    } else if (module == "352") {
        d = 3;
        c = 5;
        a = 2;
    } else if (module == "424") {
        d = 4;
        c = 2;
        a = 4;
    } else if (module == "433") {
        d = 4;
        c = 3;
        a = 3;
    } else if (module == "442") {
        d = 4;
        c = 4;
        a = 2;
    } else if (module == "451") {
        d = 4;
        c = 5;
        a = 1;
    } else if (module == "523") {
        d = 5;
        c = 2;
        a = 3;
    } else if (module == "532") {
        d = 5;
        c = 3;
        a = 2;
    } else if (module == "541") {
        d = 5;
        c = 4;
        a = 1;
    }
    
    var ff = document.getElementById("formazione");
    ff.innerHTML = "<h3>Formazione</h3>";
    
    var el = document.createElement("label");
    el.innerHTML = "Tattica"
    var t = create_tactic();
    ff.appendChild(t)
    ff.appendChild(create_separator());
    
    // GOAL KEEPER
    var el = create_element("GK", 0);
    ff.appendChild(el);
    ff.appendChild(create_separator());
    
    // DEFENDERS
    for (var i = 0; i < d; i++) {
        var el = create_element("DF", i);
        ff.appendChild(el);
    }
    ff.appendChild(create_separator());
    
    // MIDDLE
    for (var i = 0; i < c; i++) {
        var el = create_element("MF", i);
        ff.appendChild(el);
    }
    ff.appendChild(create_separator());
    
    // ATTACKERS
    for (var i = 0; i < a; i++) {
        var el = create_element("FW", i);
        ff.appendChild(el);
    }
    ff.appendChild(create_separator());
    
    // PANCHINA
    ff.appendChild(create_panch());
    ff.appendChild(create_separator());
    
    // PK
    var el = create_element("PK:", 0);
    ff.appendChild(el);
    ff.appendChild(create_separator());    
};

var tactics = 0;
var new_tactic = function() {
    var table = document.getElementById("tabletactic");
    var row = document.createElement("tr");
    
    // select tactic - changepos - sub
    var el = document.createElement("td");
    var sel = document.createElement("select")
    sel.id = "tact_" + tactics;
    sel.name = "tal" + tactics + "0";
    sel.innerHTML = "<option value='---'>---</option> <option value='TACTIC'>TACTIC</option> <option value='CHANGEPOS'>CHANGEPOS</option> <option value='SUB'>SUB</option>"
    el.appendChild(sel);
    row.appendChild(el);
    
    // select option based on selected before
    var el = document.createElement("td");
    el.id = "efftact_" + tactics;
    row.appendChild(el)
    
    // first condition
    var el = document.createElement("td");
    var label = document.createElement("label");
    label.textContent = "IF";
    label.style.width = "20px";
    el.appendChild(label);
    row.appendChild(el);
    
    // select min or scope
    var el = document.createElement("td");
    var sel = document.createElement("select");
    sel.id = "firstms_" + tactics;
    sel.name = "tal" + tactics + "4";
    sel.innerHTML = "<option value='---'>---</option> <option value='MIN'>MIN</option> <option value='SCORE'>SCORE</option>"
    el.appendChild(sel);
    row.appendChild(el);
    
    // option from previous
    var el = document.createElement("td");
    el.id = "efffirstms_" + tactics;
    row.appendChild(el)
    
    // // second condition optional
    // var el = document.createElement("td");
    // var label = document.createElement("label");
    // label.textContent = "IF";
    // label.style.width = "20px";
    // el.appendChild(label);
    // row.appendChild(el);
    
    // select min or scope
    var el = document.createElement("td");
    var sel = document.createElement("select");
    sel.name = "tal" + tactics + "7";
    sel.id = "secondms_" + tactics;
    sel.innerHTML = "<option value='---'>---</option> <option value='MIN'>MIN</option> <option value='SCORE'>SCORE</option>"
    el.appendChild(sel);
    row.appendChild(el);
    
    // option from previous
    var el = document.createElement("td");
    el.id = "effsecondms_" + tactics;
    row.appendChild(el)
    
    table.appendChild(row);
    eventTattics();
    tactics++;
    
};

var create_select_number = function(min, max) {
    var sel = document.createElement("select");
    for (var i=min; i<=max; i++){
        var opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        sel.appendChild(opt);
    }
    return sel;
};

var create_select_pos = function() {
    var pos = ["GK", "DF", "MF", "FW"];
    var sel = document.createElement("select");
    for (var i = 0; i < pos.length; i++) {
        var opt = document.createElement("option");
        opt.value = pos[i];
        opt.textContent = pos[i];
        sel.appendChild(opt);
    }
    return sel;
}

var create_select_sign = function() {
    var pos = ["=", ">=", "<=", ""];
    var sel = document.createElement("select");
    for (var i = 0; i < pos.length; i++) {
        var opt = document.createElement("option");
        opt.value = pos[i];
        opt.textContent = pos[i];
        sel.appendChild(opt);
    }
    return sel;
}

var eventTattics = function() {
    var tact = document.getElementById("tact_" + tactics);
    tact.addEventListener("change", function() {
        var id = this.id.split("_")[1];
        var eff = document.getElementById("efftact_" + id);
        eff.innerHTML = "";
        
        if (this.value == "TACTIC") {
            var sel = create_select_tactic();
            sel.name = "tal" + id + "1";
            eff.appendChild(sel);
        } else if (this.value == "CHANGEPOS") {
            var sel = create_select_number(1, 11);
            sel.name = "tal" + id + "1";
            eff.appendChild(sel);
            var sel = create_select_pos();
            sel.name = "tal" + id + "2";
            eff.appendChild(sel);
        } else if (this.value == "SUB") {
            var sel = create_select_number(1, 11);
            sel.name = "tal" + id + "1";
            eff.appendChild(sel);
            var sel = create_select_number(12, 16);
            sel.name = "tal" + id + "2";
            eff.appendChild(sel);
            var sel = create_select_pos();
            sel.name = "tal" + id + "3";
            eff.appendChild(sel);
        } 
    });
    
    var firstms = document.getElementById("firstms_" + tactics);
    firstms.addEventListener("change", function() {
        var id = this.id.split("_")[1];
        var eff = document.getElementById("efffirstms_"+id);
        eff.innerHTML = "";

        var sel = create_select_sign();
        sel.name = "tal" + id + "5";
        eff.appendChild(sel);
        
        if (this.value == "MIN") {
            var sel = create_select_number(1, 90);
            sel.name = "tal" + id + "6";
            eff.appendChild(sel);
        } else if (this.value == "SCORE") {
            var sel = create_select_number(-10, 10);
            sel.name = "tal" + id + "6";
            eff.appendChild(sel);
        }
        
    });
    
    var secondms = document.getElementById("secondms_" + tactics);
    secondms.addEventListener("change", function() {
        var id = this.id.split("_")[1];
        var eff = document.getElementById("effsecondms_"+id);
        eff.innerHTML = "";

        var sel = create_select_sign();
        sel.name = "tal" + id + "8";
        eff.appendChild(sel);
        
        if (this.value == "MIN") {
            var sel = create_select_number(1, 90);
            sel.name = "tal" + id + "9";
            eff.appendChild(sel);
        } else if (this.value == "SCORE") {
            var sel = create_select_number(-10, 10);
            sel.name = "tal" + id + "9";
            eff.appendChild(sel);
        } 
        
    });
    
    
    
}

// Get parameters from the current URL
var team = "";
var players_name = [];

window.onload = function() {
    var mod = document.getElementById("modulo");
    
    mod.addEventListener("change", function () {
        var save = document.getElementById("save");
        if (mod.value != "") {
            insert_formation(mod.value);
        }
    });
    
    var squ = document.getElementById("squadra");
    squ.addEventListener("change", function() {
        var team_table = document.getElementById("teamtable");
        team_table.innerHTML = "";
        players_name = [];
        
        if (squ.value != "") {
            team = squ.value;
            mod.disabled = false;
            create_table_team(team);
        } else {
            mod.disabled = true;
        }
        
    });    
    
    var tacticbutton = document.getElementById("newtactic");
    tacticbutton.addEventListener("click", function() {
        var c = document.getElementById("n_tat");
        c.value = parseInt(c.value) + 1;
        new_tactic();
    })

    
};

// read file
// https://stackoverflow.com/questions/23331546/how-to-use-javascript-to-read-local-text-file-and-read-line-by-line
// write file
// https://stackoverflow.com/questions/5403912/create-a-text-file-using-javascript



