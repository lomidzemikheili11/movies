import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieItem, MovieService } from '../../services/movie';

@Component({
  selector: 'app-series',
  imports: [CommonModule, Header, Footer, Sidebar, MovieCard],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {
  series: MovieItem[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.series = this.movieService.filterMovies({ type: 'series' });
  }
}
