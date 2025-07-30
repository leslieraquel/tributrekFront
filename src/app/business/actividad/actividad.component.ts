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
import { DialogActividadComponent } from '../dialog-actividad/dialog-actividad.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';



export interface UserData {
  idActividad: number;
  nombreActividad: string;
  estadoActividad: string;
}

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [MatFormFieldModule, 
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
            ReactiveFormsModule,
          LoadingOverlayComponent ],
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.scss'
})


export class ActividadComponent implements AfterViewInit {
   mostrarCard: boolean = false;
    displayedColumns: string[] = ['idActividad', 'nombreActividad', 'estadoActividad','acciones'];
    dataSource = new MatTableDataSource<UserData>();

  constructor(private http: HttpClient,public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  cargando: boolean = false;

  
    ngAfterViewInit():void {
      this.cargarActividades();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cargando = true;

    }
  
     cargarActividades() {
      this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Actividades/ListarActividades')
        .subscribe(data => {
          console.log(data);
          this.dataSource.data = data;
          this.cargando = false;

        }, error => {
          console.error('Error al cargar actividades:', error);
        });
    }

     eliminarActividades() {
      this.http.delete('https://localhost:7089/api/tributrek/Actividades/EliminarActividades')
        .subscribe(data => {
          console.log(data);
          this.cargando = false;

        }, error => {
        });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

   abrirDialogo(modo: 'agregar' | 'editar', actividad?: any): void {
  this.dialog.open(DialogActividadComponent, {
    panelClass: 'custom-dialog-container',
    data: {
      modo: modo,
      actividad: actividad || {}
    }
  }).afterClosed().subscribe(result => {
    // if (result === true) {
      this.cargarActividades(); // Vuelve a cargar si hubo cambios
    // }
  });
}


}
