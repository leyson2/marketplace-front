import { AuthService } from './../../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { MustMatch } from '../validator/confirmed_validator';
import { ShipmentService } from 'src/app/Services/shipment.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  submitted = false;
  userData: any;
  durationInSeconds = 3;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private _auth: AuthService,
    private shareData: ShipmentService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      { validator: MustMatch('password', 'password_confirmation') }
    );
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this._snackBar.open('Por favor, complete todos los campos.','', {
        duration: this.durationInSeconds * 1000,
      });
      return;
    }
    this._auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLogin = true;
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          showConfirmButton: false,
          timer: 1500
        })
      },
    });
  }

  registerView() {
    this.isLogin = false;
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.userData = jwt_decode(res.token);
        localStorage.setItem('token', res.token);
        this.shareData.setInfoLogin(true);
        this.dialogRef.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (e) => {
        this._snackBar.open('  Usuario o Contraseña Incorrectos','', {
          duration: this.durationInSeconds * 1000,
        });
      },
    });
  }

  modalClose() {
    this.dialogRef.close();
  }
}
