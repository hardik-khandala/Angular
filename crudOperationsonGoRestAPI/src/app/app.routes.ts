import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'page/:page', component: AppComponent},
    { path: '**', redirectTo: 'page/1', pathMatch: 'full' },
    { path: '', redirectTo: 'page/1', pathMatch: 'full' }
];
