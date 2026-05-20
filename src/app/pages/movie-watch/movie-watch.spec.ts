import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWatch } from './movie-watch';

describe('MovieWatch', () => {
  let component: MovieWatch;
  let fixture: ComponentFixture<MovieWatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWatch],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieWatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
