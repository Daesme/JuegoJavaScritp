/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Variables globales
var velocidad = 50;
var desplazamiento = 3;
var superficie = 567;
var ncactus = 600;
var nbalas=200;
var bucle;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ancho = canvas.width;
var alto = canvas.height;
var modal = document.getElementById("modal");
pocisionAvionx=50;
pocisionAviony=50;


//ddd

//Clases

 class Objeto {
	constructor(){
		this.img = document.createElement("img");
	}
	choque(otro){
		if(this.fondo < otro.techo || this.techo > otro.fondo || this.derecha < otro.izquierda || this.izquierda > otro.derecha){
			return false;
		} else {
			return true;
		}
	}
}

class Mundo {
	constructor(){
                
		this.x = 0;
		this.y = superficie;
		this.tamano = 15000;
		this.espacio = 32;
		this.img = document.createElement("img");
		this.img.src = "Imagenes/mundo.png";
                this.imgNube=document.createElement("img");
                this.imgNube.src="Imagenes/nube.png";
                this.espacio2=550;
                this.nx=0;
                this.ny=25;
                this.nd=250;
                this.imgm=document.createElement("img");
                this.imgm.src="Imagenes/montañas.png"
                this.espacio3=300;
                this.mx=-10;
                this.my=270;
                this.md=250;
    
    }
	dibujar(){
		var tx = this.x;
                var tx1=this.nx;
		var tx2=this.mx;
                for(var i=0; i<=this.tamano;i++){
			ctx.drawImage(this.img, tx, this.y);
                        ctx.drawImage(this.imgNube,tx1,this.ny);
                         ctx.drawImage(this.imgm,tx2,this.my);
                         tx2+=this.espacio3;
                        tx1+=this.espacio2;
			tx+=this.espacio;
		}
	}
	mover(){
		this.x-=8;
                this.nx-=2;
                this.mx-=5;
	}
}
class Avion extends Objeto {
	constructor(){
		super();
		this.x = 35;
		this.w = 100;
		this.h = 116;
		this.y = 50;
                this.img=document.createElement("img");
		this.img.src = "Imagenes/avion.png";
                
    }
	dibujar(){
		ctx.drawImage(this.img, this.x, this.y);
                
            }
        
        actualizarBordes(){
		this.techo = this.y;
		this.fondo = this.y+this.h+10;
	}    
        }
        
        
	
        
class Misil extends Objeto {
    constructor(){
        super();
        this.imgMis=document.createElement("img");
		this.imgMis.src = "Imagenes/misil.png";
                this.xm=50;
                this.ym=50;
                this.h=60;
                this.w=38;
                this.i=1;
                this.siguintes=null;
                this.techo=this.ym;
                this.fondo=this.ym+this.h;
                
                this.derecha=this.xm+this.w;
                this.izquierda=this.ym;
    }
    dibujarmisil(x,y){
        if ( this.i==1) {
            this.xm=x;
            this.ym=y;
            this.derecha=x+this.w;
                         this.izquierda=x;
                         this.techo=y;
                         this.fondo=y+this.h;
           
            this.i=this.i+1;
        }
            ctx.drawImage(this.imgMis,this.xm,this.ym);
//            ctx.fillStyle="#ff0000";
//       ctx.fillRect(this.izquierda,this.techo,15,15);
//       ctx.fillStyle="#D7DF01";
//        ctx.fillRect(this.derecha,this.techo,15,15);
//        ctx.fillStyle="#0101DF";
//        ctx.fillRect(this.izquierda,this.fondo,15,15);
//        ctx.fillStyle="#000000";
//        ctx.fillRect(this.derecha ,this.fondo,15,15);
       
            if (this.siguentes!=null) {
            this.siguente.dibujarmisil(x,y);
            this.i=1;
}


    }
        movermisil(){
            this.ym+=15;
            this.xm+=8;
            this.derecha+=8;
            this.izquierda+=8;
            this.techo+=15;
            this.fondo+=15;
            if (this.siguente!=null) {
            this.siguentes.movermisil();
}
        }
        agregar(){
            if(this.siguiente==null){
                this.siguiente=new Misil();
            }else{
                this.siguiente.agregar();
            }
        }
        
        
        }   


class Cactus extends Objeto {
	constructor(x){
		super();
		this.x = x;
		this.hmin = 40;
		this.hmax = 70;
		this.h = this.generar(this.hmin, this.hmax);
		this.w = this.h*(0.58);
		this.y = superficie-this.h;
		this.nmin = 1;
		this.nmax = 3;
		this.n = this.generar(this.nmin, this.nmax);
		this.dmin = 250;
		this.dmax = 400;
		this.d = this.generar(this.dmin, this.dmax);
		this.siguiente = null;
		this.img.src = "Imagenes/barril.png";
		
		this.techo = this.y;
		this.fondo = this.y+this.h;
		this.derecha = this.x+this.w;
		this.izquierda = this.x;
	}
	dibujar(){
		var tx = this.x;
		for(var i=0;i<this.n;i++){
			ctx.drawImage(this.img, tx, this.y, this.w, this.h);
			tx+=this.w;
			this.derecha = tx;
	
        }
//        ctx.fillStyle="#ff0000";
//       ctx.fillRect(this.izquierda,this.techo,15,15);
//       ctx.fillStyle="#D7DF01";
//        ctx.fillRect(this.derecha,this.techo,15,15);
//        ctx.fillStyle="#0101DF";
//        ctx.fillRect(this.izquierda,this.fondo,15,15);
//        ctx.fillStyle="#000000";
//        ctx.fillRect(this.derecha ,this.fondo,15,15);
       
		if(this.siguiente != null){
			this.siguiente.dibujar();
		}
	}
	mover(){
		this.x-=8;
                
		this.izquierda = this.x;
		if(this.siguiente != null){
			this.siguiente.mover();
		}
	}
	agregar(){
		if(this.siguiente == null){
			this.siguiente = new Cactus(this.x+this.d);
		} else{
			this.siguiente.agregar();
		}
	}
	generar(a,b){
		return Math.floor((Math.random() * b) + a);
	}
	verSiguiente(){
		return this.siguiente;
	}
}
class Tiempo {
	constructor(){
		this.nivel = 0;
		this.tiempo = 0;
		this.limite = 500;
		this.intervalo = 100/velocidad;
                
		
		this.sonido = document.createElement("audio");
		this.sonido.src = "Imagenes/aviso.mp3";
                this.sonido2 = document.createElement("audio");
		this.sonido2.src = "Imagenes/exp.mp3";
	}
	dibujar(){
		ctx.font = "25px Arial";
		ctx.fillText(this.nivel.toString(), 550, 40);
	}
	
	tick(){
		this.tiempo+=this.intervalo;
                
		if(this.tiempo >= this.limite){
                    this.sonido.play();
                    findeJuego();
		}
	}
	
}
//Objetos
var mundo = new Mundo();
 
var av = new Avion();

var cactus = new Cactus(600);
for(i=0;i<=ncactus;i++){
	cactus.agregar();
}
var mis=new Misil();


        for ( i = 0; i <=nmisiles; i++) {
mis.agregar();
}
var tiempo;
//funciones de control
var velocidadSalto = 30;
var desplazamientoSalto = 5;
var disparar = false;
var salto;



function subir(){
	av.y=av.y-desplazamiento;
        
	av.actualizarBordes();
                if (av.y<=0) {
        av.y=0;
        }
	
}
function bajar(){
	av.y=av.y+desplazamiento;
        
	av.actualizarBordes();
        if (av.y>=300) {
        av.y=300;
}
		
	
}
function avanzar(){
	av.x=av.x+desplazamiento;
        pocisionAvionx=av.x;
	av.actualizarBordes();

	if (av.x>=1000) {
av.x=1000;
}	
	
}
function retroceder(){
	av.x=av.x-desplazamiento;
        pocisionAvionx=av.x;
	av.actualizarBordes();
	if (av.x<=0) {
        av.x=0;
}
		
	
}

function mover(event){
	if(event.keyCode==38){
			subir();		
	}
        if(event.keyCode == 40){
			bajar();	
	}
        if(event.keyCode == 39){
			avanzar();	
	}
        if(event.keyCode == 37){
			retroceder();	
	}
        if(event.keyCode==32){
                        disparar=true;
                           

    }
}



function findeJuego(){
	clearInterval(bucle);
	modal.style.display = "block";
	document.getElementById("imgbtn").src = "Imagenes/otravez.png";
	mundo = new Mundo();
        mis=new Misil(av.x,av.y);
	av = new Avion();
	velocidad = 50;
	cactus = new Cactus(600);
	for(i=0;i<=ncactus;i++){
	cactus.agregar();
	}
        disparar=false;
}
function choqueCactus(){
	var temp = cactus;
              
                 if(temp.choque(mis)){
			//Puntaje
                        tiempo.nivel++;
                        cactus = cactus.verSiguiente();
                        disparar=false;
                        tiempo.sonido2.play();
               
                        }
		 if (cactus.derecha<0) {
                    cactus = cactus.verSiguiente();
                        }
                else {
			temp = temp.verSiguiente();
		}
	
}
//function destruirCactus(){
//    var temp = cactus;
//    
//	if(cactus.derecha < 0||temp.choque(mis)){
//            
//	tiempo.nivel++;	
//        disparar=false;
//        cactus = cactus.verSiguiente();
//	} else {
//			temp = temp.verSiguiente();
//		}
//}

//funciones globales
function dibujar(){
	ctx.clearRect(0,0,ancho, alto);
        mundo.dibujar();
	av.dibujar();
	if (disparar==true) {
              mis.dibujarmisil(av.x,av.y);  
        } 
                if (mis.ym>=500 || disparar==false) {
                         mis.ym=av.y;
                         mis.xm=av.x;
                         mis.derecha=av.x+mis.w;
                         mis.izquierda=av.x;
                         mis.techo=av.y;
                         mis.fondo=av.y+mis.h;
                        disparar=false;
                        }
        cactus.dibujar();
	tiempo.dibujar();

        
}

function frame(){
	dibujar();
         if (disparar==true) {                    
        mis.movermisil();
         }
	mundo.mover();
	cactus.mover();
	tiempo.tick();
	choqueCactus();
//	destruirCactus();
                               
}
function iniciar(){
	modal.style.display = "none";
	bucle = setInterval("frame()", velocidad);
	tiempo = new Tiempo();
}
