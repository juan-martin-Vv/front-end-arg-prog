import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Login, LoginFormTemplate } from '../Class/login';
import { NuevoUsuario, NuevoUsuarioTemplate } from '../Class/nuevo-usuario';
import { ControlModel } from '../formulario/control-model';
import { ControlService } from '../formulario/control.service';
import { AuthService } from '../Service/auth.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login2Component implements OnInit {

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
  closeResult!: String;
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
    private cd: ChangeDetectorRef,
    //
    public activeModal: NgbActiveModal
  ) { }
  goHome(): void {
    //this.router.navigateByUrl('/?reload=on')
    this.activeModal.close()
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
    this.isLoggedFail = false;
    this.loginForm.reset();
  }
  onReg(): void {
    this.onRegVar = true;
    this.onLoginVar = false;
    this.isRegisterFail = false;
    this.nuevoUsurioForm.reset();
  }
  loggin(loginUserIn?: Login) {
    let login: Login;
    this.isLogged = false;
    this.isLoggedFail = false;
    if (loginUserIn != null) {
      this.loginUser = loginUserIn;
    }
    else {
      login = <Login>this.loginForm.getRawValue();
      this.loginUser = new Login(login.nombreUsuario, login.password);
      console.log("else login nomb: " + login.nombreUsuario + " pass: " + login.password);
    }
    this.authService.loginUser(this.loginUser).subscribe(
      d => {
        this.tokenService.setToken(d.token);

      },
      e => {
        this.isLogged = false;
        this.isLoggedFail = true;
        window.sessionStorage.clear();
        this.log_eMsg = e;
        this.cd.detectChanges()
      },
      () => {
        this.tokenService.isAdmin();// verificamos si es admin y emitimos!!
        this.isLogged = true;
        this.isLoggedFail = false;
        this.router.navigateByUrl('/?reload=on')
        this.cd.markForCheck()
      }
    );
  }
  onRegister(): void {
    let nuevo_user: NuevoUsuario;
    nuevo_user = <NuevoUsuario>this.nuevoUsurioForm.getRawValue(); //formulario ya validado
    this.authService.nuevoUser(nuevo_user).subscribe(
      d => {},
      e => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.reg_eMsg = e;
        this.cd.markForCheck()
      },
      () => {
        this.isRegister = true;
        this.isRegisterFail = false;
        this.cd.markForCheck()
        //pasamos los datos para habilitar el login despues de un reg exitoso
        this.loggin(new Login(nuevo_user.nombreUsuario, nuevo_user.password));
      }
    );
  }
}
