import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogPaqueteComponent } from './dialog-paquete/dialog-paquete.component';


export interface UserData {
  idPaquete: number;
  diasPaquete: string;
  descripcionPaquete: string;
  nombrePaquete: string;
}

@Component({
  selector: 'app-paquete',
  standalone: true,
  imports: [ MatFormFieldModule, 
             MatInputModule,
             MatTableModule,
             MatSortModule,
             MatPaginatorModule,
             HttpClientModule,
             MatIconModule,
            MatButtonModule,
            MatDividerModule,
            MatCardModule,
            CommonModule,
            MatDialogModule,
            FormsModule,
            ReactiveFormsModule ],
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.scss'
})
export class PaqueteComponent implements AfterViewInit  {

   mostrarCard: boolean = false;
    displayedColumns: string[] = ['idPaquete', 'nombrePaquete', 'cantidadDias', 'nombreItinerario','acciones'];
    dataSource = new MatTableDataSource<UserData>();
  
    constructor(private http: HttpClient,public dialog: MatDialog) {}
  
    @ViewChild(MatPaginator) paginator!: MatPaginator; 
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cargarPaquetes();
    }
  
     cargarPaquetes() {
      this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Itinerario/ListarItinerario')
        .subscribe(data => {
          console.log(data);
          this.dataSource.data = data;
        }, error => {
          console.error('Error al cargar itinerarios:', error);
        });
    }
  
    // eliminarItinerario(itinerario:any){
    //   const{idItinerario}=itinerario;
    //   console.log(idItinerario);
    //   this.http.delete(`https://localhost:7089/api/tributrek/Itinerario/EliminarItinerario/${idItinerario}`)
    // .subscribe({
    //   next: () => {
    //     console.log('Itinerario eliminado correctamente');
    //   },
    //   error: (error) => {
    //     console.error('Error al eliminar el itinerario:', error);
    //   }
    // });
  
  
    // }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    abrirDialogo(modo: 'agregar' | 'editar', paquete?: any): void {
      console.log(paquete);
  
      this.dialog.open(DialogPaqueteComponent, {
           width: '90%',   // 90% del ancho del viewport padre (ventana)
          height: '80%',  // 80% del alto del viewport padre
          maxWidth: '85%',  // desactivar el maxWidth por defecto
           data: {
        modo: modo,                   // 'agregar' o 'editar'
        paquete: paquete || {} // si es editar, le pasas el objeto
      }
      });
      
    } 

}
