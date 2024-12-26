import { Routes } from '@angular/router';
import { LoginComponent } from './guard/login/login.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: "login",
        component: LoginComponent
    },
];
