import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieItem } from '../../services/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard {
  @Input({ required: true }) movie!: MovieItem;
  
  ngOnInit(): void {
    console.log('Movie object received:', this.movie);
    if (!this.movie) {
      console.error('Warning: Movie object is missing!');
    }
  }
}