import { Component, HostListener, inject } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-client-config',
  imports: [],
  templateUrl: './client-config.component.html',
  styleUrl: './client-config.component.css',
})
export class ClientConfigComponent {

  appState = inject(AppStateService)

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.appState.toggleClientConfig();
    }
  }


}

