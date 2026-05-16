import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MovieService } from '../../services/movie';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { MovieItem } from '../../services/movie';

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
    private route:ActivatedRoute,
    private movieService:MovieService
  ){}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovie(id!)
      .subscribe((res:any)=>{

        this.movie = res;

      });

  }

}
