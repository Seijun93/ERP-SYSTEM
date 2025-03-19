import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { AppStateService } from '../../services/app-state.service';
import { ClientConfigComponent } from "../client-config/client-config.component";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [
    ClientConfigComponent,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  appState = inject(AppStateService)
  authService = inject(AuthService)
}
