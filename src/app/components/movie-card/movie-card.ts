import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieItem } from '../../services/movie';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input({ required: true }) movie!: MovieItem;
}
