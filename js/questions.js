var formElement=null;
var textoSecreto1=null;
var respuestaSelect1=null;
var respuestasCheckbox1 = [];
var respuestasMultiple1 = [];
var respuestasRadio1 = [];
var textoSecreto2=null;
var respuestaSelect2=null;
var respuestasCheckbox2 = [];
var respuestasMultiple2 = [];
var respuestasRadio2 = [];
var nota = 0;  

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar())
   {
    corregirText1();
    corregirSelect1();
    corregirCheckbox1();
	corregirMultiple1();
	//corregirRadio1();
	corregirText2();
    corregirSelect2();
    corregirCheckbox2();
	corregirMultiple2();
	//corregirRadio2();
    presentarNota();
   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 

  //TEXT 1 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el texto
 var tituloSelect=xmlDoc.getElementById("p001").getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml1(tituloSelect);
 textoSecreto1=xmlDoc.getElementById('p001').getElementsByTagName("answer")[0].innerHTML;
 
  //SELECT1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("p002").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("p002").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);

  //CHECKBOX1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("p003").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("p003").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("p003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("p003").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
 }
 
  //MULTI1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[3].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("p004").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("p004").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultipleHtml1(tituloSelect,opcionesSelect);
 respuestasMultiple1=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 
   //RADIO1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("p005").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("p005").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio1(tituloRadio,opcionesRadio);
 var nres = xmlDoc.getElementById("p005").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById("p005").getElementsByTagName("answer")[i].innerHTML;
 }

  //TEXT 2 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el texto
 var tituloSelect=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 ponerDatosInputHtml2(tituloSelect);
 textoSecreto2=xmlDoc.getElementById('p006').getElementsByTagName("answer")[0].innerHTML;
 
  //SELECT2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[6].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("p007").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("p007").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml2(tituloSelect,opcionesSelect);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);

  //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].childNodes[0].nodeValue;
 var opcionesCheckbox2 = [];
 var nopt = xmlDoc.getElementById("p008").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox2[i]=xmlDoc.getElementById("p008").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml2(tituloCheckbox2,opcionesCheckbox2);
 var nres = xmlDoc.getElementById("p008").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("p008").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
 }

  //MULTI2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[8].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("p009").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("p009").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultipleHtml2(tituloSelect,opcionesSelect);
 respuestasMultiple2= parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue) + parseInt(xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue);

  //RADIO2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("p010").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("p010").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosradio2(tituloRadio,opcionesRadio);
 var nres = xmlDoc.getElementById("p010").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio2[i]=xmlDoc.getElementById("p010").getElementsByTagName("answer")[i].innerHTML;
 }
}
  
//****************************************************************************************************
//implementación de la corrección

function corregirText1(){
  var s=formElement.elements[0].value;     
  if (s==textoSecreto1) {
   darRespuestaHtml("P1: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P1: Incorrecto");
}

function corregirText2(){
  var s=formElement.elements[5].value;     
  if (s==textoSecreto2) {
   darRespuestaHtml("P6: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P6: Incorrecto");
}

function corregirSelect1(){
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect1) { 
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}

function corregirSelect2(){
  var sel = formElement.elements[6];  
  if (sel.selectedIndex-1==respuestaSelect2) { 
   darRespuestaHtml("P6: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P6: Incorrecto");
}

function corregirCheckbox1(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;    
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;     
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}

function corregirCheckbox2(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;    
     darRespuestaHtml("P7: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;     
     darRespuestaHtml("P7: "+i+" incorrecta");
    }   
   } 
  }
}

function corregirMultiple1(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var mySel = formElement.elements[3];  
  if (mySel.selectedIndex==respuestasMultiple1) {
   darRespuestaHtml("P4: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P4: Incorrecto");
}

function corregirMultiple2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var mySel = formElement.elements[8];  
  if (mySel.selectedIndex==respuestasMultiple2) {
   darRespuestaHtml("P9: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P9: Incorrecto");
}

function corregirRadio1() {
  var r=null;
  var opt = document.getElementById("p005").elements["radio"];
  for (i = 0; i < opt.length; i++) {
    if(opt[i].checked) {r=i;}
  }
  if(r==respuestasRadio1) {darRespuestaHtml("P5: Correcto"); nota +=1;}
  else {
   darRespuestaHtml("P5: Incorrecto");
  }
}

function corregirRadio2() {
  var r=null;
  var opt = document.getElementById("p010").elements["radio"];
  for (i = 0; i < opt.length; i++) {
    if(opt[i].checked) {r=i;}
  }
  if(r==respuestasRadio2) {darRespuestaHtml("P10: Correcto"); nota +=1;}
  else {
   darRespuestaHtml("P10: Incorrecto");
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}

function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosMultipleHtml1(t,opt){
  document.getElementById("tituloMultiple1").innerHTML=t;  
  var mSelect = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    mSelect.options.add(option);
 }  
}

function ponerDatosradio1(t,opt){
 var radioContainer=document.getElementById('tituloRadio1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio1_"+i);
    input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	radioContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosInputHtml2(t){
 document.getElementById("tituloInput2").innerHTML = t;
}

function ponerDatosSelectHtml2(t,opt){
  document.getElementById("tituloSelect2").innerHTML=t;
  var select2 = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select2.options.add(option);
 }  
}

function ponerDatosCheckboxHtml2(t,opt){
 var checkboxContainer2=document.getElementById('checkboxDiv2');
 document.getElementById('tituloCheckbox2').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer2.appendChild(input);
    checkboxContainer2.appendChild(label);
    checkboxContainer2.appendChild(document.createElement("br"));
 }  
}

function ponerDatosMultipleHtml2(t,opt){
  document.getElementById("tituloMultiple2").innerHTML=t;  
  var mSelect2 = document.getElementsByTagName("select")[3];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    mSelect2.options.add(option);
 }  
}

function ponerDatosradio2(t,opt){
 var radioContainer2=document.getElementById('tituloRadio2');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer2.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio2_"+i);
    input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i;;    
    radioContainer2.appendChild(input);
    radioContainer2.appendChild(label);
	radioContainer2.appendChild(document.createElement("br"));
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe algo");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;    
   if (f.elements[5].value=="") {
    f.elements[5].focus();
    alert("Escribe algo mas");
    return false;
   } else if (f.elements[6].selectedIndex==0) {
    f.elements[6].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[7].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}