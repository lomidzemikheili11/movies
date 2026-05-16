import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Header } from '../header/header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule, Header],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // შემოგვაქვს სერვისი ტოკენის სამართავად
    private router: Router             // შემოგვაქვს როუტერი გადამისამართებისთვის
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // ვუგზავნით მონაცემებს Everrest API-ს (/auth/sign_in)
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          alert('Logged in successfully! Welcome back.');
          this.router.navigate(['/']); // წარმატებული შესვლის შემდეგ გადავყავართ მთავარ გვერდზე
        },
        error: (err: { error: { message: any; }; }) => {
          console.error('ლოგინის ერორი:', err.error);
          // თუ პაროლი ან მეილი არასწორია
          alert('Login failed: ' + (err.error?.message || 'Invalid email or password'));
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}