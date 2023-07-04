import { CanActivateFn } from '@angular/router';

export const rolGuard: CanActivateFn = (route, state) => {

  const rol =  sessionStorage.getItem('rol');
  console.log("rol => ", rol)

  if(rol == 'USUARIO' && state.url == 'me/reports'){
      window.location.href = '/denegado';
      return false;
  }

  return true;
};
