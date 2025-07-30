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
import { DialogNivelComponent } from './dialog-nivel/dialog-nivel.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';



export interface UserData {
  idNivel: number;
  nombreNivel: string;
  estadoNivel: string;
}

@Component({
  selector: 'app-nivel',
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
             LoadingOverlayComponent],
  templateUrl: './nivel.component.html',
  styleUrl: './nivel.component.scss'
})
export class NivelComponent  implements AfterViewInit  {
        cargando: boolean = false;
        mostrarCard: boolean = false;
        displayedColumns: string[] = ['idNivel', 'nombreNivel','estadoNivel','acciones'];
        dataSource = new MatTableDataSource<UserData>();

      constructor(private http: HttpClient,public dialog: MatDialog) {}

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

        ngAfterViewInit():void {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cargando = true;
          this.cargarNiveles();
        }

         cargarNiveles() {
          this.http.get<UserData[]>('https://localhost:7089/api/tributrek/Nivel/ListarNivel')
            .subscribe(data => {
              this.cargando = false;
              console.log(data);
              this.dataSource.data = data;
            }, error => {
              console.error('Error al cargar actividades:', error);
            });
        }

        applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();

          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }

        abrirDialogo(modo: 'agregar' | 'editar', nivel?: any): void {
          console.log(nivel);
          this.dialog.open(DialogNivelComponent, {
            panelClass: 'custom-dialog-container',
           data: {
           modo: modo,
           nivel: nivel || {}
          }
        }).afterClosed().subscribe(result => {
            this.cargarNiveles(); 
      });

        }


}
