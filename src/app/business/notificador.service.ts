import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificadorService {
 constructor() { }
   private actualizarListaSource = new Subject<void>();
  actualizarLista$ = this.actualizarListaSource.asObservable();
   notificarActualizacion() {
    this.actualizarListaSource.next();
  }
}
