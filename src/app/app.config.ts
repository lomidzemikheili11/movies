// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient()
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // დარწმუნდი რომ ეს გაქვს

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), // აქ ჩავსვით hash-ის მხარდაჭერა
    provideHttpClient() // არ დაგავიწყდეს HttpClient-ის მიწოდება
  ]
};