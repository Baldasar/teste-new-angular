import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (!this.username || !this.password || !this.confirmPassword) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    this.authService.regiser(this.username, this.password).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
      },
      error: (error) => {
        alert('Erro ao cadastrar usuário: ' + error.error.message);
      },
    })
  }
}
