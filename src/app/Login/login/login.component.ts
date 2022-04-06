import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, LoginFormTemplate } from 'src/app/Class/login';
import { NuevoUsuario, NuevoUsuarioTemplate } from 'src/app/Class/nuevo-usuario';
import { ControlModel } from 'src/app/formulario/control-model';
import { ControlService } from 'src/app/formulario/control.service';
import { AuthService } from 'src/app/Service/auth.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoggedFail = false;
  isRegister = false;
  isRegisterFail = false;
  loginUser!: Login;
  nuevoUser!: NuevoUsuario;
  titulo: String = "Login Homerin";
  //
  log_eMsg: String = '';
  reg_eMsg: String = '';
  pageSelect!: boolean;
  //
  onLoginVar: boolean = false;
  onRegVar: boolean = false;
  //
  // nombre!: String;
  // nombreUsuario!: String;
  // password!: String;
  // email!: String;
  //
  closeResult!:String;
  //
  loginFormLabes: ControlModel<String>[] = LoginFormTemplate;
  loginForm!: FormGroup;
  //
  nuevoUsurioFormLabel: ControlModel<String>[] = NuevoUsuarioTemplate;
  nuevoUsurioForm!: FormGroup;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private formService: ControlService,
    private cd :ChangeDetectorRef
  ) {}

  goHome():void{
    this.router.navigate(['/']);
  }
  //
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = false;
      this.isLoggedFail = false;
      this.isRegister = false;
      this.isRegisterFail = false;

    }
    this.loginForm = this.formService.toFromGroup(this.loginFormLabes);
    this.nuevoUsurioForm = this.formService.toFromGroup(this.nuevoUsurioFormLabel);
  }

  onLogin(): void {
    this.onLoginVar = true;
    this.onRegVar = false;
    //
    this.isLoggedFail = false;
    this.loginForm.reset();
  }
  onReg(): void {
    this.onRegVar = true;
    this.onLoginVar = false;
    //
    this.isRegisterFail = false;
  }
  loggin(loginUserIn?: Login) {
    let login: Login;
    this.isLogged = false;
    this.isLoggedFail = false;
    if (loginUserIn != null) {
      this.loginUser = loginUserIn;
      console.log("if login");
      console.log(this.loginUser);
    }

    else {
      login = <Login>this.loginForm.getRawValue();
      this.loginUser = new Login(login.nombreUsuario, login.password);
      console.log("else login nomb: " + login.nombreUsuario + " pass: " + login.password);
    }


    this.authService.loginUser(this.loginUser).subscribe(
      d => {

        //
        this.tokenService.setToken(d.token);

      },
      e => {
        this.isLogged = false;
        this.isLoggedFail = true;
        window.sessionStorage.clear();
        this.log_eMsg = e;
        console.log(e);
        this.cd.markForCheck()
      },
      () => {
        //console.log("nombre almacenado: " + this.tokenService.getUserName());
        this.isLogged = true;
        this.isLoggedFail = false;
        this.cd.markForCheck()
      }
    );

  }
  onRegister(): void {
    let nuevo_user: NuevoUsuario;

    nuevo_user = <NuevoUsuario>this.nuevoUsurioForm.getRawValue(); //formulario ya validado
    //this.nuevoUser = new NuevoUsuario(this.nombre, this.nombreUsuario, this.password, this.email);
    this.authService.nuevoUser(nuevo_user).subscribe(
      d => {

        console.log("good register")
      },
      e => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.reg_eMsg = e.error;
        console.log("fail in onRegister");
        this.cd.markForCheck()
      },
      () => {
        this.isRegister = true;
        this.isRegisterFail = false;
        console.log(`isRegister :${this.isRegister}`);
        this.loggin(new Login(nuevo_user.nombreUsuario, nuevo_user.password));
        this.cd.markForCheck()
      }
    );

  }

}
