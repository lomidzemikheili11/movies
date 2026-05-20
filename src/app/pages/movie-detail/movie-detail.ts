import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { MovieItem, MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail implements OnInit {
  movie: MovieItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // ვიღებთ პარამეტრს და ვუერთდებით სერვისს
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieService.getMovie(id).subscribe(data => {
          this.movie = data;
        });
      }
    });
  }
}