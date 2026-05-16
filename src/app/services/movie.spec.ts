import { TestBed } from '@angular/core/testing';
import { MovieCard } from '../components/movie-card/movie-card';


describe('MovieCard', () => {
  let service: MovieCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
