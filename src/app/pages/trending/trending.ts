import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieItem, MovieService } from '../../services/movie';

@Component({
  selector: 'app-trending',
  imports: [CommonModule, Header, Footer, Sidebar, MovieCard],
  templateUrl: './trending.html',
  styleUrl: './trending.css',
})
export class Trending implements OnInit {
  movies: MovieItem[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(() => {
      this.movies = this.movieService.filterMovies({ trending: true });
    });
  }
}