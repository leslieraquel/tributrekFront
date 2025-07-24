import { Routes } from '@angular/router';
import { LoginComponent} from './business/authentication/login/login.component';
import { LayoutComponent } from './business/layout/layout.component';

export const routes: Routes = [
   { path: '', component: LoginComponent },
   {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {path: 'itinerario',loadComponent: () =>import('./business/itinerario/itinerario.component').then(m => m.ItinerarioComponent)},
      {path: 'actividad',loadComponent: () =>import('./business/actividad/actividad.component').then(m => m.ActividadComponent)},
      {path: 'categoria',loadComponent: () =>import('./business/categoria/categoria.component').then(m => m.CategoriaComponent)},
      {path: 'nivel',loadComponent: () =>import('./business/nivel/nivel.component').then(m => m.NivelComponent)},
      {path: 'usuario',loadComponent: () =>import('./business/usuario/usuario.component').then(m => m.UsuarioComponent)},
      {path: 'paquete',loadComponent: () =>import('./business/paquete/paquete.component').then(m => m.PaqueteComponent)},
      
    //   { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) }
    ]
  },
   // Ruta por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard al final
  { path: '**', redirectTo: 'login' }
  
];

