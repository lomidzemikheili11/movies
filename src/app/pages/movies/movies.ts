import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';
import { MovieItem, MovieService } from '../../services/movie';
import { MovieCard } from "../../components/movie-card/movie-card";

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink, Header, Footer, Sidebar, MovieCard],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  movies: MovieItem[] = [];
  title = 'Movies';
  description = 'Choose movies by genre, language, and year.';

  genres = ['Action', 'Drama', 'Fantasy', 'Horror'];
  languages = ['Georgian Dub', 'English Dub', 'Georgian Subtitles', 'English Subtitles'];
  years = ['2026', '2025', '2024'];

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

 ngOnInit(): void {
  this.movieService.getMovies().subscribe((res) => {
     // თუ აქაც res.data გაქვთ, შეცვალეთ res-ით
     this.movies = res; 
  
     this.route.queryParamMap.subscribe((params) => {
      this.movies = this.movieService.filterMovies({
        type: 'movie',
        genre: params.get('genre'),
        year: params.get('year'),
        language: params.get('language'),
        search: params.get('search'),
      });
    });
  });
}

}