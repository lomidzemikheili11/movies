import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { MovieItem, MovieService } from '../../services/movie';
import { SafePipe } from "../../safe.pipe";

@Component({
  selector: 'app-movie-watch',
  standalone: true,
  imports: [Header, Footer, CommonModule, RouterLink, SafePipe],
  templateUrl: './movie-watch.html',
  styleUrl: './movie-watch.css',
})
export class MovieWatch implements OnInit {
  movie: any; // 'any' გამოვიყენოთ, რომ პრობლემები ავირიდოთ

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovie(id).subscribe((res: any) => {
        console.log('Movie watch received:', res);
        this.movie = res; // აქ ინახება მონაცემი, მათ შორის 'url' ველი
      });
    }
  }
}