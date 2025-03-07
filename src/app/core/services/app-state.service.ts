import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  showClientConfig = signal(false)

  toggleClientConfig () {
    this.showClientConfig.update(value => !value)
    console.log(this.showClientConfig())
  }
}
