import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface MovieItem {
  _id: string;
  title: string;
  type: 'movie' | 'series';
  year: number;
  genre: string;
  language: string;
  rating: number;
  comments: number;
  image: string;
  trending?: boolean;
  upcomingDate?: string;
}

export const MOVIES: MovieItem[] = [
  {
    _id: 'avatar-fire',
    title: 'Avatar: Fire and Ash',
    type: 'movie',
    year: 2025,
    genre: 'Fantasy',
    language: 'Georgian Dub',
    rating: 7.3,
    comments: 468,
    trending: true,
    image: 'https://image.tmdb.org/t/p/w780/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
  },
  {
    _id: 'send-help',
    title: 'Send Help',
    type: 'movie',
    year: 2026,
    genre: 'Drama',
    language: 'English Subtitles',
    rating: 6.8,
    comments: 351,
    trending: true,
    image: 'https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
  {
    _id: 'war-machine',
    title: 'War Machine - Katil Robotlar',
    type: 'movie',
    year: 2026,
    genre: 'Action',
    language: 'English Dub',
    rating: 6.3,
    comments: 458,
    trending: true,
    image: 'https://image.tmdb.org/t/p/w780/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg',
  },
  {
    _id: 'bone-temple',
    title: '28 Years Later The Bone Temple',
    type: 'movie',
    year: 2026,
    genre: 'Horror',
    language: 'Georgian Dub',
    rating: 7.3,
    comments: 263,
    image: 'https://image.tmdb.org/t/p/w780/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg',
  },
  {
    _id: 'predator-wild',
    title: 'Predator: Wild Lands',
    type: 'movie',
    year: 2025,
    genre: 'Action',
    language: 'English Dub',
    rating: 7.2,
    comments: 789,
    image: 'https://image.tmdb.org/t/p/w780/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg',
  },
  {
    _id: 'zootropolis-2',
    title: 'Zootropolis 2',
    type: 'movie',
    year: 2025,
    genre: 'Fantasy',
    language: 'Georgian Dub',
    rating: 7.4,
    comments: 242,
    image: 'https://image.tmdb.org/t/p/w780/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg',
  },
  {
    _id: 'clean-up-crew',
    title: 'The Clean Up Crew',
    type: 'movie',
    year: 2025,
    genre: 'Action',
    language: 'Georgian Subtitles',
    rating: 4.2,
    comments: 116,
    image: 'https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
  },
  {
    _id: 'shaman',
    title: 'Shaman',
    type: 'movie',
    year: 2024,
    genre: 'Horror',
    language: 'Georgian Dub',
    rating: 6.9,
    comments: 205,
    trending: true,
    image: 'https://image.tmdb.org/t/p/w780/sRLC052ieEzkQs9dEtPMfFxYkej.jpg',
  },
  {
    _id: 'dongji-rescue',
    title: 'Dongji Rescue',
    type: 'movie',
    year: 2025,
    genre: 'Drama',
    language: 'English Subtitles',
    rating: 7.1,
    comments: 184,
    trending: true,
    image: 'https://image.tmdb.org/t/p/w780/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg',
  },
  {
    _id: 'arcane',
    title: 'Arcane',
    type: 'series',
    year: 2024,
    genre: 'Fantasy',
    language: 'English Dub',
    rating: 8.7,
    comments: 922,
    image: 'https://image.tmdb.org/t/p/w780/abf8tHznhSvl9BAElD2cQeRr7do.jpg',
  },
  {
    _id: 'the-last-of-us',
    title: 'The Last of Us',
    type: 'series',
    year: 2025,
    genre: 'Drama',
    language: 'Georgian Subtitles',
    rating: 8.3,
    comments: 650,
    image: 'https://image.tmdb.org/t/p/w780/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
  },
  {
    _id: 'mortal-kombat-2',
    title: 'Mortal Kombat II',
    type: 'movie',
    year: 2026,
    genre: 'Action',
    language: 'English Dub',
    rating: 7.0,
    comments: 95,
    upcomingDate: '26 May',
    image: 'https://image.tmdb.org/t/p/w500/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
  },
  {
    _id: 'supergirl',
    title: 'Supergirl',
    type: 'movie',
    year: 2026,
    genre: 'Fantasy',
    language: 'Georgian Dub',
    rating: 7.5,
    comments: 83,
    upcomingDate: '24 Jun',
    image: 'https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
  },
];

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = 'https://api.everrest.educata.dev/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<{ data: MovieItem[] }> {
    return of({ data: MOVIES });
  }

  getMovie(id:string): Observable<MovieItem | undefined> {
    return of(MOVIES.find(movie => movie._id === id));
  }

  filterMovies(options: {
    type?: string | null;
    genre?: string | null;
    year?: string | null;
    language?: string | null;
    trending?: boolean;
    search?: string | null;
  }): MovieItem[] {
    return MOVIES.filter(movie => {
      const matchesType = !options.type || movie.type === options.type;
      const matchesGenre = !options.genre || movie.genre.toLowerCase() === options.genre.toLowerCase();
      const matchesYear = !options.year || movie.year === Number(options.year);
      const matchesLanguage = !options.language || movie.language.toLowerCase().includes(options.language.toLowerCase());
      const matchesTrending = !options.trending || movie.trending;
      const matchesSearch = !options.search || movie.title.toLowerCase().includes(options.search.toLowerCase());

      return matchesType && matchesGenre && matchesYear && matchesLanguage && matchesTrending && matchesSearch;
    });
  }

  getUpcoming(): MovieItem[] {
    return MOVIES.filter(movie => movie.upcomingDate);
  }

  createMovie(data:any){
    return this.http.post(this.apiUrl,data);
  }

  updateMovie(id:string,data:any){
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }

  deleteMovie(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
