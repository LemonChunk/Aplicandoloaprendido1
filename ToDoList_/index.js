import promptSync from 'prompt-sync';
const teclado = promptSync();
let fechaActual = new Date();
//funciones
function crearTarea(titulo = "Sin título", descripcion = "Sin descripción", estado = "P", vencimiento = "Ninguna", dificultad = "F") {
    return {
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        fechaDeCreacion: new Date(),
        ultimoCambio: new Date(),
        vencimiento: vencimiento,
        dificultad: dificultad
    };
}
function esperarTeclaParaContinuar() {
    teclado('Presiona Enter para continuar...');
}
function limpiarPantalla() {
    process.stdout.write('\x1Bc'); // o '\033c'
}
function esAnioBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0);
}
function pedirFechaVencimiento(){
    let anio, mes, dia, band=-1, hora, fechaVencimiento;
    anio = teclado("Ingrese el año de vencimiento: ");
    anio=parseInt(anio);
    while(isNaN(anio) || anio<1000 || anio>9999){
        anio = teclado("   año de vencimiento ingresado inválido, ingrese nuevamente: " );
        anio= parseInt(anio);
    }
    mes = teclado("Ingrese el mes de vencimiento(1 al 12): ");
    mes= parseInt(mes);
    while(isNaN(mes) ||(mes<1 || mes>12)){
        mes = teclado("    mes de vencimiento ingresado inválido, ingrese nuevamente: ");
        mes= parseInt(mes);
    }
    do{
        if(band>=0){
            console.log("   ERROR: ingresó un dia inválido.");
        }
        switch(mes){
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                dia = teclado("Ingrese el dia de vencimiento:(1 al 31) "); 
                dia= parseInt(dia);
                if(dia<1 || dia>31){
                    dia=NaN;
                }   
                break;
            case 2:
                if(esAnioBisiesto(anio)){
                    dia = teclado("Ingrese el dia de vencimiento:(1 al 29) ")   
                    dia= parseInt(dia);
                    if(dia<1 || dia>29){
                        dia=NaN;
                    } 
                }
                else{
                    dia = teclado("Ingrese el dia de vencimiento:(1 al 28) "); 
                    dia= parseInt(dia);  
                    if(dia<1 || dia>28){
                        dia=NaN;
                    } 
                }
                break;
            case 4: case 6: case 9: case 11: 
               parseInt(dia = teclado("Ingrese el dia de vencimiento:(1 al 30) "),10); 
                if(dia<1 || dia>30){
                    dia=NaN;
                }   
                break;
        }
        band++;
    }while(isNaN(dia));
    hora = teclado("Ingrese la hora de vencimiento(ingrese valores enteros de 0 a 23): ");
    hora = parseInt(hora);
    while(isNaN(hora) ||(hora<0 || hora>23)){
        hora = teclado("    hora de vencimiento ingresado inválido, ingrese nuevamente: ");
        hora= parseInt(hora);
    }
    fechaVencimiento = new Date(anio, mes-1, dia, hora);
    return fechaVencimiento;
}
function menuPrincipal(){
    console.log("¡Hola Olivia!\t\n ¿Qué deseas hacer?");
    console.log("[1] Ver mis tareas.\n[2] Buscar una tarea.\n[3] Agregar una tarea.\n[0] Salir.");
    let opcion = teclado("Su opción: ");
    return opcion;
}
function ordenarTareas(){
    let tareaAux = crearTarea();
    for(let i=0;i<listaDeTareas.length;i++){
        for(let j=0;j<listaDeTareas.length-1;j++){
            if(listaDeTareas[j].titulo>listaDeTareas[j+1].titulo){
                tareaAux=listaDeTareas[j];
                listaDeTareas[j]=listaDeTareas[j+1];
                listaDeTareas[j+1]=tareaAux;
            }
        }
    }
}
function menuTareas(){
    console.log("¿Qué tareas deseas ver?")
    console.log("[1] Todas.\n[2] Pendientes.\n[3] En curso.\n[4] Terminadas.\n[0] Salir.");
    let opcion = teclado("Su opción: ");
    return opcion;
}
function menuAgregarTarea(titulo, descripcion, estado, dificultad, vencimiento){
    console.log("Está creando una nueva tarea.\n\nPara ingresar datos, seleccione una opción");
    console.log(`[1] Ingresar titulo(Actual: ${titulo})`);
    console.log(`[2] Ingresar Descripción(Actual: ${descripcion})`);
    console.log(`[3] Ingresar estado(Actual: ${estado})`);
    console.log(`[4] Ingresar dificultad(Actual: ${dificultad})`);
    console.log(`[5] Ingresar fecha de Vencimiento(Actual: ${vencimiento})`);
    console.log("Presione 0 para terminar de crearla y guardar los datos.\nPresione X para cancelar la ");
    let opcion = teclado("Su opción: ");
    return opcion;
}
function menuVerTareas(){
    console.log("¿Qué tareas desea ver?\n[1] Todas.\n[2] Pendientes.\n[3] En Curso\n[4] Terminadas.\n[0] Volver");
    let opcion = teclado("Su opción: ");
    return opcion;
}
function ingresarTitulo(){
    let titulo = teclado("1. Ingrese el título(obligatorio): ");
    while(titulo===""){
        titulo = teclado("   ERROR: título no puede ser nulo, Ingreselo nuevamente: ");
    }
    return titulo;
}
function ingresarDescripcion(){
    let descripcion= teclado("Ingrese la descripción: ");
    return descripcion;
}
function ingresarEstado(){
    let estado = teclado("3. Ingrese el estado, por defecto pendiente: [P]endiente/[E]n curso/[T]erminada/[C]ancelada: ");
    while (estado!="P" && estado!="E" && estado!="T" && estado!="C"){
        estado=teclado("   ERROR: el estado ingresado es inválido, ingrese nuevamente: ");
    }
    return estado;
}
function ingresarDificultad(){
    let dificultad=teclado("4. Ingrese la dificultad, por defecto fácil: [F]ácil(⭐)/[M]edio(⭐⭐)/[D]ifícil(⭐⭐⭐): ");
    while(dificultad!="F" && dificultad!="M" && dificultad!="D"){
        dificultad=teclado("   ERROR: la dificultad ingresada es inválida, ingrese nuevamente: ");
    }
    return dificultad;
}
function ingresarFechaVencimiento(){
   let fechaVenciento= pedirFechaVencimiento();;
    while(fechaVenciento<=fechaActual){
        console.log("   ERROR: ingresó una fecha que fue antes de la actual o es la actual.");
        fechaVenciento= pedirFechaVencimiento();
    }
    return fechaVenciento;
}
function verTodas(){
    const arrayIndices= [];
    console.log("Estas son todas tus tareas:");
    for (let i = 0; i < listaDeTareas.length; i++) {
        arrayIndices.push(i);
        console.log(`[${i + 1}] ${listaDeTareas[i].titulo}.`);
    }
    verDetalles(arrayIndices);
}
function verConCondicion(s){
    let band=0;
    const arrayIndices= [];
    console.log("Estas son tus tareas con el estado seleccionado:");
    for (let i = 0; i < listaDeTareas.length; i++) {
        if(listaDeTareas[i].estado===s){
            band=1;
            arrayIndices.push(i);
            console.log(`[${i + 1}] ${listaDeTareas[i].titulo}.`);
        }
    }
    if(band==0){
        console.log("No tienes tareas con este estado.");
        esperarTeclaParaContinuar();
    }
    else{
        verDetalles(arrayIndices);
    }
}
function mostrarTarea(i){
    console.log("-----------------------------------");
    console.log(`Título: ${listaDeTareas[i].titulo}.`);
    console.log(`Descripción: ${listaDeTareas[i].descripcion}.`);
    if(listaDeTareas[i].estado=="P"){
        console.log("Estado: Pendiente.");
    }
    else{
        if(listaDeTareas[i].estado=="E"){
            console.log("Estado: En curso.");
        }
        else{
            if(listaDeTareas[i].estado=="T"){
                console.log("Estado: Terminada.");
            }
            else{
                console.log("Estado: Cancelada.");
            }
        }
    }
    if(listaDeTareas[i].dificultad=="F"){
        console.log("Dificultad: ⭐");
    }
    else{
        if(listaDeTareas[i].dificultad=="M"){
            console.log("Dificultad: ⭐⭐");
        }
        else{
            console.log("Dificultad: ⭐⭐⭐");
        }
    }
    console.log(`Fecha de creación: ${listaDeTareas[i].fechaDeCreacion}.`);
    console.log(`Fecha de última modificación: ${listaDeTareas[i].ultimoCambio}.`);
    console.log(`Fecha de vencimiento: ${listaDeTareas[i].vencimiento}.`);
    console.log("-----------------------------------");
}
function editarTarea(i){
    let editar, fecha, tareaAux = crearTarea();
    tareaAux=listaDeTareas[i];
    let fechaAhora = new Date();
    do{
        limpiarPantalla();
        console.log(`Estás editando la tarea ${tareaAux.titulo}`);
        console.log(`[1] editar titulo(Actual: ${tareaAux.titulo})`);
        console.log(`[2] editar Descripción(Actual: ${tareaAux.descripcion})`);
        console.log(`[3] editar estado(Actual: ${tareaAux.estado}, oprima [C] para marcarla como cancelada)`);
        console.log(`[4] editar dificultad(Actual: ${tareaAux.dificultad})`);
        console.log(`[5] editar fecha de Vencimiento(Actual: ${tareaAux.vencimiento}\n)`);
        console.log("Presione 0 para terminar de editarla y guardar los datos.");
        editar = teclado("Su opción: ");
        tareaAux.ultimoCambio=fechaAhora;
        limpiarPantalla();
        switch(editar){
            case "1":
                tareaAux.titulo=ingresarTitulo();
                break;
            case "2":
                tareaAux.descripcion=ingresarDescripcion();
                break;
            case "3":
                tareaAux.estado=ingresarEstado();
                break;
            case "4":
                tareaAux.dificultad=ingresarDificultad();
                break;
            case "5":
                console.log("Desea...\n[0]Dejar en blanco fecha de vencimiento\n[1]Modificarla fecha de vencimiento\n Cualquier otro valor permite volver atrás.");
                fecha = teclado("Su opción: ");
                if(fecha==="0"){
                    tareaAux.vencimiento="Ninguna";
                }
                else{
                    if(fecha==="1"){
                        tareaAux.vencimiento=ingresarFechaVencimiento();
                    }
                }
                break;
            case "C":
                console.log("Usted ha marcado a la tarea como cancelada.");
                esperarTeclaParaContinuar();
                tareaAux.estado="Cancelada";
                break;
            case "0":
                ordenarTareas();
                console.log("Datos guardados con éxito.\n Volviendo al menú anterior.");
                esperarTeclaParaContinuar();
                break;
            default:
                console.log("Opción inválida.");
                esperarTeclaParaContinuar();
                break;
        }
    }while(editar!="0");
}
function estaIndice(array, index){
    for(let i=0;i<array.length;i++){
        if(index===array[i]){
            return true;
        }
    }
    return false;
}
function verDetalles(indices){
    let index, editar;
    console.log("¿Deseas ver los detalles de alguna?\nIntroduce el número para verla o 0 para volver.");
    index = parseInt(teclado("Su opción: "));
    if(index!=0){
        while(isNaN(index) || !estaIndice(indices, index-1)){
            index = parseInt(teclado("Opción inválida, ingrese nuevamente: "));
        }
    }
    
    limpiarPantalla();
    if(index===0){
        console.log("Volviendo al menú anterior.");
    }
    else{
        console.log("Esta es la tarea que elegiste.");
        mostrarTarea(index-1);
        console.log("\nSi deseas editarla, presione E, o 0 para volver.");
        editar=teclado("Su opción: ");
        while(editar!="E" && editar!="0"){
            editar=teclado("opción inválida, ingrese nuevamente: ");
        }
        if(editar==="0"){
            limpiarPantalla();
            console.log("Volviendo al menú anterior.");
        }
        else{
            editarTarea(index-1);
        }
    }
}
function buscarTarea(cadena){
    let arrayIndices=[], band=0;
    for(let i=0;i<listaDeTareas.length;i++){
        if(listaDeTareas[i].titulo.toLowerCase().includes(cadena.toLowerCase())){
            arrayIndices.push(i);
            band++
        }
    }
    if(band===0){
        console.log("No hay tareas relacionadas con la búsqueda.");
        esperarTeclaParaContinuar();
    }
    else{
        mostrarCoincidencias(arrayIndices, band);
    }
}
function mostrarCoincidencias(array, b){
    console.log(`Hubieron ${b} coincidencias en la búsqueda: `);
    for(let i=0;i<array.length;i++){
        console.log(`[${array[i]+1}] ${listaDeTareas[array[i]].titulo} `);
    }
    verDetalles(array);
}
function opcion1(){
    let menuVer=-1;
    if(listaDeTareas.length===0){
        console.log("No tienes tareas agendadas para ver.");
        esperarTeclaParaContinuar();
    }
    else {
        do{
            limpiarPantalla();
            menuVer=menuVerTareas();
            limpiarPantalla();
            switch(menuVer){
                case "1":
                    verTodas();
                    break;
                case "2":
                    verConCondicion("P");
                    break;
                case "3":
                    verConCondicion("E");
                    break;
                case "4":
                    verConCondicion("T");
                    break;
                case "0":
                    console.log("Volviendo al menú anterior.");
                    esperarTeclaParaContinuar();
                    break;
                default:
                    console.log("Opción inválida.");
                    esperarTeclaParaContinuar();
                    break;
            }
            
        }while(menuVer!=0);
    }
}
function opcion2(){
    let cadena;
    if(listaDeTareas.length===0){
        console.log("No tienes tareas para buscar.");
        esperarTeclaParaContinuar();
    }
    else{
        console.log("Introduce el título de una tarea para buscarla: ");
        cadena= teclado("> ");
        buscarTarea(cadena);
    }
}
function opcion3(){
    let menuAgregar=-1;
    let tareaNueva = crearTarea();
    do{
        limpiarPantalla();
        menuAgregar=menuAgregarTarea(tareaNueva.titulo, tareaNueva.descripcion, tareaNueva.estado, tareaNueva.dificultad, tareaNueva.vencimiento);
        limpiarPantalla();
        switch(menuAgregar){
            case "1":
                tareaNueva.titulo=ingresarTitulo();
                break;
            case "2":
                tareaNueva.descripcion=ingresarDescripcion();
                break;
            case "3":
                tareaNueva.estado=ingresarEstado();
                break;
            case "4":
                tareaNueva.dificultad=ingresarDificultad();
                break;
            case "5":
                tareaNueva.vencimiento=ingresarFechaVencimiento();
                break;
            case "X":
                console.log("Tarea cancelada, volviendo al menú principal.");
                esperarTeclaParaContinuar();
                break;
            case "0":
                if(tareaNueva.titulo==="Sin título"){
                    menuAgregar=-1;
                    console.log("No se puede agregar la tarea sin título.");
                    esperarTeclaParaContinuar();
                }
                else{
                    listaDeTareas.push(tareaNueva);
                    ordenarTareas();
                    console.log(`¡Tarea creada con éxito!`);
                    esperarTeclaParaContinuar();
                }
                break;
            default:
                console.log("Opción inválida.");
                esperarTeclaParaContinuar();
                break;
        }
    }while(menuAgregar!="0" && menuAgregar!="X");
}
//main
const listaDeTareas= [];
let mainMenu=-1;
do{
    limpiarPantalla();
    mainMenu=menuPrincipal();
    limpiarPantalla();
    switch(mainMenu){
        case "1":
            opcion1();
            break;
        case "2":
            opcion2();
            break;
        case "3":
            opcion3();
            break;
        case "0":
            console.log("Saliendo del programa...");
            break;
        default:
            console.log("ERROR: opción no válida.");
            break;
    }
}while(mainMenu!="0");
