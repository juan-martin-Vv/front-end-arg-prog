export class AboutClass {
  constructor(nomb?:String,apel?:String,profPerfil?:String,descPerfil?:String)
  {
    this.nombre=nomb??"/***/";
    this.apellido=apel??"/******/";
    this.profesionalPerfil=profPerfil??"ummmm";
    this.descripionPerfil=descPerfil??"<U_U>";
  }
  nombre!: String;
  apellido!: String;
  profesionalPerfil!: String;
  descripionPerfil!: String | null;
} {
}
