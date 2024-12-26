import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isValidLogin) {
    return true;
  }else{
    alert('Please Login to continue');
    router.navigate(['/login']);
    return false;
  }

};
