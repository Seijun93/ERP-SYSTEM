import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
