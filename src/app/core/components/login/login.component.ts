import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

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

  loginForm: FormGroup

  constructor (private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((userCredential) => {
        console.log('Erfolgreich eingeloggt', userCredential)
      })
      .catch((error) => {
        alert('Fehler beim Login' + error)
      })
  }

  register() {
    this.authService.register(this.loginForm.value.email, this.loginForm.value.password)
  }

}
