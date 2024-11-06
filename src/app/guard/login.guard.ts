import { CanActivateFn } from '@angular/router';
import {  inject } from '@angular/core';
import { AuthService } from '../servicio/auth/auth.service';
import { Router } from '@angular/router';
export const loginGuard: CanActivateFn = (route, state) => {
  const authIn = inject (AuthService) as AuthService;
  const routerin = inject (Router) as Router;
  if (authIn.accessToken == null){
    routerin.navigateByUrl('/');
    return false;
  }
  return true;
};

