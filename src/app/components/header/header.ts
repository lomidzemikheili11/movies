import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  search = '';
  isDark = true;


  constructor(
    private router: Router,
    public authService: AuthService // public-ია, ამიტომ HTML პირდაპირ დაინახავს ამ სერვისს
  ) {
    // ❌ "this.isLoggedIn = ..." ხაზიც ამოვაგდეთ, რომ ცვლადი არ გაიყინოს
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.body.classList.toggle('light-theme', !this.isDark);
  }

  submitSearch(): void {
    const value = this.search.trim();
    
    if (!value) {
      return;
    }

    this.router.navigate(['/movies'], {
      queryParams: { search: value },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}