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
import { DialogItinerarioComponent } from './dialog-itinerario/dialog-itinerario.component';



export interface UserData {
  idItinerario: number;
  nombreItinerario: string;
  nombreCategoria: string;
  descripcionNivel: string;
  estadoItinerario: string;
}



@Component({
  selector: 'app-itinerario',
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
            ReactiveFormsModule 
          ],
  templateUrl: './itinerario.component.html',
  styleUrl: './itinerario.component.scss'
})

export class ItinerarioComponent implements AfterViewInit  {
  mostrarCard: boolean = false;
  displayedColumns: string[] = ['idItinerario', 'nombreItinerario', 'nombreCategoria', 'descripcionNivel','estadoItinerario','acciones'];
  dataSource = new MatTableDataSource<UserData>();

  constructor(private http: HttpClient,public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarItinerarios();
  }

   cargarItinerarios() {
    this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Itinerario/ListarItinerario')
      .subscribe(data => {
        console.log(data);
        this.dataSource.data = data;
      }, error => {
        console.error('Error al cargar itinerarios:', error);
      });
  }

  eliminarItinerario(itinerario:any){
    const{idItinerario}=itinerario;
    console.log(idItinerario);
    this.http.delete(`https://localhost:7089/api/tributrek/Itinerario/EliminarItinerario/${idItinerario}`)
  .subscribe({
    next: () => {
      console.log('Itinerario eliminado correctamente');
    },
    error: (error) => {
      console.error('Error al eliminar el itinerario:', error);
    }
  });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  abrirDialogo(modo: 'agregar' | 'editar', itinerario?: any): void {
    console.log(itinerario);

    this.dialog.open(DialogItinerarioComponent, {
         width: '90%',   // 90% del ancho del viewport padre (ventana)
        height: '80%',  // 80% del alto del viewport padre
        maxWidth: '85%',  // desactivar el maxWidth por defecto
         data: {
      modo: modo,                   // 'agregar' o 'editar'
      itinerario: itinerario || {} // si es editar, le pasas el objeto
    }
    });
    
  } 
}