import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   constructor(private router: Router) {}

  irAItinerarios() {
    this.router.navigate(['/itinerario']);
  }
  
  irActividades() {
    this.router.navigate(['/actividad']);
  }

    
  irCategoria() {
    this.router.navigate(['/categoria']);
  }

    irNiveles() {
    this.router.navigate(['/nivel']);
  }
      irUsuarios() {
    this.router.navigate(['/usuario']);
  }

    irPaquetes() {
    this.router.navigate(['/paquete']);
  }
}
