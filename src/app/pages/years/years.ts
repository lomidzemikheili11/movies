import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieItem, MovieService } from '../../services/movie';

@Component({
  selector: 'app-years',
  imports: [CommonModule, RouterLink, Header, Footer, Sidebar, MovieCard],
  templateUrl: './years.html',
  styleUrl: './years.css',
})
export class Years implements OnInit {
  movies: MovieItem[] = [];
  selected = 'All';
  years = ['2026', '2025', '2024'];

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selected = params.get('year') || 'All';
      this.movies = this.movieService.filterMovies({
        year: params.get('year'),
      });
    });
  }
}
