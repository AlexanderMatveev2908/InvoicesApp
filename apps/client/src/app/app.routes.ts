import { Routes } from '@angular/router';
import { HomePage } from '../pages/homePage/home-page';
import { NoticePage } from '../pages/noticePage/notice-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'notice',
    component: NoticePage,
  },
];
