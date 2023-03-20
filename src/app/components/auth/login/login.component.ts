import { AuthService } from './../../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  titleModal: string = 'Register';
  btnTitle: string = 'register';
  isLogin: boolean = true;

  registerForm!: FormGroup;
  loginForm!: FormGroup;

  submitted = false;
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (
      this.registerForm.value.password ===
      this.registerForm.value.password_confirmation
    ) {
      this._auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          //this.toastr.success(res.men);
          console.log(res);
          // this.dialogRef.close();
          this.isLogin = true;
        },
        error: (e) => {
          //this.toastr.error('Algo salio mal');
          alert('mal');
        },
      });
    }
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
        //this.toastr.success(res.men);
        this.userData = jwt_decode(res.token);
        console.log('User data', this.userData);
        this.dialogRef.close();
      },
      error: (e) => {
        //this.toastr.error('Algo salio mal');
        alert('mal');
      },
    });
  }
}
