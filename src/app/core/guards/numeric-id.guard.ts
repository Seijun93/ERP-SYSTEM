import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const numericIdGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id')
  const router = inject(Router)

  if (id && /^\d+$/.test(id)) {
    return true
  }

  const fallback = '/' + state.url.split('/')[1]
  router.navigate([fallback])

  return false;
};
