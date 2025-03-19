import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService)
  private router = inject(Router)

  loginForm: FormGroup
  error: string | null = null

  constructor (private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

  }

  onLogin() {
    if (!this.loginForm.valid) {
      return
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      resData => {
        this.router.navigate([''])
      },
      errorMessage => {
        this.error = errorMessage
        alert(this.error)
      }
    )
  }

  onSignup() {
    if (!this.loginForm.valid) {
      return
    }
    this.authService.signup(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      resData => {
        this.router.navigate([''])
      },
      errorMessage => {
        this.error = errorMessage
        alert(this.error)
      }
    )
    this.loginForm.reset()
  }

  onForgottenPassword() {
    alert('Pech gehabt')
  }

}
