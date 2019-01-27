import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class ChatRouteGaurdService implements CanActivate{

  private authToken: string = Cookie.get('authtoken')

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {
    console.log('in gaurd service');
    if(this.authToken === undefined || this.authToken === null || this.authToken == ''){
      this.router.navigate(['/']);
      return false
    } else {
      return true
    }
    
  }
}
