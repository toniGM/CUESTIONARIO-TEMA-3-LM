var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
//var respuestasMultiple=null;
//var respuestasRadio = null;
var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)  cambie del 3 a 10

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   corregirNumber();          // esto lo he cambiado de corregirInput a lo que hay
   corregirSelect();
   corregirCheckbox();
   //corregirMultiple();    // esto lo he añadido yo para corregir no se si funcionara
  // corregirRadio();       // igual que el anterior
   presentarNota();   
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
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el numero   AQUI CAMBIE UN MONTON DE COSAS TODO LO QUE PONIA TITULOINPUT A TITULOTEXT,,,
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;             // Y AQUI CAMBIE ponerDatosTextHtml antes habia ponerDatosInputHtml
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("p002").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("p002").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("p003").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("p003").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("p003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("p003").getElementsByTagName("answer")[i].innerHTML;
 }

 //MULTIPLE
 //Recuperamos el título y las opciones, guardamos las respuestas correctas					esto lo he añadido   falta completar las variables
 //var tituloMultiple = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 //var opcionesMultiple = [];
 //var nopt = xmlDoc.getElementById("p004").getElementsByTagName('option').length;
 
 
 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 //var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
// var opcionesRadio = [];
// var nopt = xmlDoc.getElementById("p005").getElementsByTagName('option').length;
 
 
 //TEXT
 //Recuperamos el título y la respuesta correcta de Text, guardamos la respuesta correcta
// var tituloText=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 //ponerDatosTextHtml(tituloText);
//respuestaText=parseInt(xmlDoc.getElementsByTagName("answer")[5].innerHTML);
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
// var tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 //var opcionesSelect = [];
 //var nopt = xmlDoc.getElementById("p007").getElementsByTagName('option').length;
 // for (i = 0; i < nopt; i++) { 
    //opcionesSelect[i] = xmlDoc.getElementById("p007").getElementsByTagName('option')[i].innerHTML;

 //ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 //respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[6].innerHTML;

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 //var tituloCheckbox = xmlDoc.getElementsByTagName("title")[7].innerHTML;
// var opcionesCheckbox = [];
 //var nopt = xmlDoc.getElementById("p008").getElementsByTagName('option').length;
// for (i = 0; i < nopt; i++) { 
    //opcionesCheckbox[i]=xmlDoc.getElementById("p008").getElementsByTagName('option')[i].innerHTML;
// }  
 //ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
// var nres = xmlDoc.getElementById("p008").getElementsByTagName('answer').length;
 //for (i = 0; i < nres; i++) { 
 // respuestasCheckbox[i]=xmlDoc.getElementById("p008").getElementsByTagName("answer")[i].innerHTML;
 //

 //MULTIPLE
 //Recuperamos el título y las opciones, guardamos las respuestas correctas					esto lo he añadido   falta completar las variables
 //var tituloMultiple = xmlDoc.getElementsByTagName("title")[8].innerHTML;
 //var opcionesMultiple = [];
 //var nopt = xmlDoc.getElementById("p009").getElementsByTagName('option').length;
 
 
 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 //var tituloRadio = xmlDoc.getElementsByTagName("title")[9].innerHTML;
// var opcionesRadio = [];
// var nopt = xmlDoc.getElementById("p010").getElementsByTagName('option').length;
}

//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("P1: Te has pasado");
    else darRespuestaHtml("P1: Te has quedado corto");
  }
}


function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   }
  }
}


//             PONER FUNCIONES DE MULTIPLE Y DE RADIO

//function corregirText(){                                          //NO FUNCIONA LA CORRECCION.......
 // var s=formElement.elements[0].value;     
 /// if (s==respuestaText) {
  // darRespuestaHtml("P6: Correcto");
 //  nota +=1;
 // }
 // else darRespuestaHtml("P6: Incorrecto");
//}

///function corregirSelect(){
 // var sel = formElement.elements[1];  
 // if (sel.selectedIndex==respuestaSelect) {
 //  darRespuestaHtml("P7: Correcto");
 //  nota +=1;
 // }
 // else darRespuestaHtml("P7: Incorrecto");
//}

//function corregirCheckbox(){
 // var f=document.getElementById('myform');
  //var escorrecta = [];
  //for (i = 0; i < f.color.length; i++) {
  // if (f.color[i].checked) {
  //  escorrecta[i]=false;     
   // for (j = 0; j < respuestasCheckbox.length; j++) {
   //  if (i==respuestasCheckbox[j]) escorrecta[i]=true;
  //  }
  // } 
  //}
 // for (i = 0; i < f.color.length; i++) {   
  // if (f.color[i].checked) {
   // if (escorrecta[i]) {
   //  nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
   //  darRespuestaHtml("P8: "+i+" correcta");    
   // } else {
   //  nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
   //  darRespuestaHtml("P8: "+i+" incorrecta");
   // }   
 //  }
 // }
//}




//             PONER FUNCIONES DE MULTIPLE Y DE RADIO



//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}                                                                        //AQUI LO CAMBIE SEGURO QUE FALTA ALGO.....

function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
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