import { Injectable, NgZone } from '@angular/core';
import { User } from "../../models/user";
import { auth }  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Guardar datos de usuario

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    /* Guardamos datos en localStorage al hacer login y lo restablecemos a null al salir */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login con email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['cpanel']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Registro con email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Enviar email de verificación
  SendVerificationMail() {
    return this.afAuth.currentUser.then( u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verificar']);
    })
  }

  // Resetear password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Se ha reseteado tu contraseña, revisa tu correo.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Comprobación de que el usuario se ha identificado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Login con Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Función para identificarse con proveedores
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
        localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['cpanel']);
        })
        this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Añadir usuarios a la base de datos firestore */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      timestamp: (new Date()).toUTCString()
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Salir
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }

}
