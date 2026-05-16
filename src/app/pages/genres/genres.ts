import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieItem, MovieService } from '../../services/movie';

@Component({
  selector: 'app-genres',
  imports: [CommonModule, RouterLink, Header, Footer, Sidebar, MovieCard],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
})
export class Genres implements OnInit {
  movies: MovieItem[] = [];
  selected = 'All';
  genres = ['Action', 'Drama', 'Fantasy', 'Horror'];

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selected = params.get('genre') || 'All';
      this.movies = this.movieService.filterMovies({
        genre: params.get('genre'),
      });
    });
  }
}
