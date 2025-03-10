import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { routes } from './app.routes';

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBpHzTW_9vNQHL2mfCCQ3PvcfHL1x5wFmg",
  authDomain: "erp-system-e5e14.firebaseapp.com",
  projectId: "erp-system-e5e14",
  storageBucket: "erp-system-e5e14.appspot.com",
  messagingSenderId: "1027604556876",
  appId: "1:1027604556876:web:0e5dc39acecf4781f898e9",
  measurementId: "G-3WQP5HVTD7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
  ]
};
