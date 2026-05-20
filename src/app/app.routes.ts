import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Movies } from './pages/movies/movies';
import { Series } from './pages/series/series';
import { Trending } from './pages/trending/trending';
import { Genres } from './pages/genres/genres';
import { Years } from './pages/years/years';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { MovieWatch } from './pages/movie-watch/movie-watch';
import { MovieDetail } from './pages/movie-detail/movie-detail';

export const routes: Routes = [

  {
    path:'',
    component:Home
  },

  {
    path:'movies',
    component:Movies
  },

  {
    path:'series',
    component:Series
  },

  {
    path:'trending',
    component:Trending
  },

  {
    path:'genres',
    component:Genres
  },

  {
    path:'years',
    component:Years
  },

  {
    path:'movie/:id',
    component:MovieDetail
  },
  {
    path:'register',
    component:RegisterComponent 
  },
  {
    path:'login',
    component:LoginComponent
  }
  
];