import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidenavService } from 'app/base/sidenav/sidenav.service';
import { environment } from '../environments/environment';

const TRANSPARENT_NAV_PAGES = [ 'login' ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class.transparent') transparent = false;

  constructor(
    private readonly router: Router,
    private readonly sidenavService: SidenavService
  ) {
    environment.lang = $localize.locale ? $localize.locale.split('-')[0] : 'en';
  }

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }

  ngOnInit() {

  }
}
