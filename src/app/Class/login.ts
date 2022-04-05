import { ControlModel, EntradaTexto, restriccion } from "../formulario/control-model";

export class Login { //loginUser.java

  nombreUsuario!:String;
  password!:String;

  constructor(nombreUsuario?:String,password?:String){
    this.nombreUsuario=nombreUsuario??"pepe hongito";
    this.password=password??"123456";

  }
}
export const LoginFormTemplate:ControlModel<String>[]=[
  new EntradaTexto({
    key:"nombreUsuario",
    required:true,
    label:"Nombre de usuario",
    restricciones:[
      {restriccion:restriccion.required ,valor:"",errores:"ingrese su nombre de usuario"},
      {restriccion: restriccion.minlength ,valor:"3",errores:"debe ser mayor de 3 letras"}
    ]
  }),
  new EntradaTexto({
    key:"password",
    required:true,
    label:"Password",
    type:"password",
    restricciones:[
      {restriccion:restriccion.required,errores:"ingrese su password"},
      //{restriccion:"minlength",valor:"6",errores:"debe ser mayor de 6 letras"}
    ]
  })
];
