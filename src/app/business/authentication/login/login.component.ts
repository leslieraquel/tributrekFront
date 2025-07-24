import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 loginData = {
    nombreUsuario: '',
    claveUsuario: ''
  };
  constructor(private http: HttpClient, private router: Router,private toastr:ToastrService) {}


  onSubmit() {
    this.http.post<any>('https://localhost:7089/api/tributrek/Usuario/autenticar', this.loginData)
    .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
          this.router.navigate(['/dashboard']);  // redirige al dashboard
        },
        error: (err) => {
          console.error(err);
          alert('Credenciales inválidas');
        }
      });
  }

}
