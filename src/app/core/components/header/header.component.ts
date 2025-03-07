import { Component, inject } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { ClientConfigComponent } from "../client-config/client-config.component";

@Component({
  selector: 'app-header',
  imports: [
    ClientConfigComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  appState = inject(AppStateService)
}
