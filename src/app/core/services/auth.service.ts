import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject, Subject, Subscription, catchError, tap, throwError } from 'rxjs';

import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: Date,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth()
  private router = inject(Router)
  private http = inject(HttpClient)

  user = new BehaviorSubject<User | null>(null)

  apiKey = this.auth.config.apiKey

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError),
    tap(() => {
      console.log('Registrierung erfolgreich')
      this.login(email, password).subscribe(
        () => {
          this.router.navigate([''])
        },
        error => {
          console.error('Fehler beim Login')
        }
      )
    })
    )
  }

  logout() {
    localStorage.removeItem('userData')
    this.user.next(null)
    this.router.navigate(['/login'])
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    )
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten'
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage)
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Diese E-Mail existiert bereits'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'E-Mail oder Passwort ist nicht korrekt'
          break
        case 'USER_DISABLED':
          errorMessage = 'Der Nutzer ist gesperrt'
          break
      }
      return throwError(errorMessage)
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData')
    if (!userDataString) {
      return
    }

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userDataString)

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token){
      this.user.next(loadedUser)
    }

  }

  // logout() {
  //   return signOut(this.auth).then(() => {
  //     this.router.navigate(['/login'])
  //   })
  // }

  isLoggedIn() {
    return this.user.value !== null
  }

}