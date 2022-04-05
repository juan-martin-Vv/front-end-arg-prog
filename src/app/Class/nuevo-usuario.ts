import { ControlModel, EntradaTexto, restriccion } from "../formulario/control-model";

export class NuevoUsuario {     //UserDTO.java
  nombre!:String;
  nombreUsuario!:String;
  password!:String;
  email!:String;
  roles!:String[];
  constructor(nombre?:String,nombreUsuario?:String,password?:String,email?:String,roles?:String[]){
    this.nombre=nombre??"pepe";
    this.nombreUsuario=nombreUsuario??"pepe hongito";
    this.password=password??"123456";
    this.email=email??"pepe@pepe.pe";
    this.roles=roles??[];
  }
}

export const NuevoUsuarioTemplate:ControlModel<String>[]=[
  new EntradaTexto({
    key:"nombre",
    label:"Nombre :",
    required:false,

  }),
  new EntradaTexto({
    key:"nombreUsuario",
    label:"Nombre de usuario a usar :",
    required:true,
    restricciones:[
      {restriccion:restriccion.required,valor:"User name",errores:"ingrese un nombre de usuario valido"},
      { restriccion:restriccion.minlength,valor:"4",errores:"debe ser mayor a 4 letras"}
    ]
  }),
  new EntradaTexto({
    key:"password",
    label:"Password :",
    type:"password",
    required:true,
    restricciones:[
      {restriccion:restriccion.required,errores:"debe ingresar un password"}
    ]
  }),
  new EntradaTexto({
    key:"email",
    label:"Email :",
    type:"email",
    required:true,
    restricciones:[
      {restriccion:restriccion.required,errores:"email es requerido!!!"},
      {restriccion:restriccion.email,valor:"mail@mail.com",errores:"ingrese un email valido"}
    ]
  })
];
