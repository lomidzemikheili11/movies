import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, filter, switchMap } from 'rxjs/operators';

export interface MovieItem {
  id: string;
  title: string;
  type: string;
  year: number;
  genre: string;
  language: string;
  rating: number;
  comments: number;
  image: string;
  trending?: boolean;
  upcomingDate?: string;
  videoUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  apiUrl = 'https://69cd2b0dddc3cabb7bd23b56.mockapi.io/movies';
  private moviesSubject = new BehaviorSubject<MovieItem[]>([]);
  
  constructor(private http: HttpClient) {}

  // მონაცემების ჩატვირთვა მხოლოდ ერთხელ
  private ensureData(): Observable<MovieItem[]> {
    if (this.moviesSubject.value.length > 0) {
      return this.moviesSubject.asObservable();
    }
    return this.http.get<MovieItem[]>(this.apiUrl).pipe(
      tap(movies => this.moviesSubject.next(movies))
    );
  }

  getMovies(): Observable<MovieItem[]> {
    return this.ensureData();
  }

  getMovie(id: string): Observable<MovieItem | undefined> {
    return this.ensureData().pipe(
      map(movies => movies.find(movie => movie.id === id))
    );
  }
  
  // დანარჩენი მეთოდები...
  filterMovies(options: any): MovieItem[] {
    return this.moviesSubject.value.filter(movie => {
      const matchesType = !options.type || movie.type === options.type;
      return matchesType; // დაამატე აქ შენი სხვა პირობებიც
    });
  }

  getUpcoming(): MovieItem[] {
    return this.moviesSubject.value.filter(movie => movie.upcomingDate);
  }
}