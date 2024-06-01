import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavItem } from 'app/base/sidenav/sidenav.model';
import { SidenavService } from 'app/base/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from 'app/base/sidenav/SIDENAV_ITEMS';
import { environment } from 'environments/environment';
import { LoginService } from 'app/data/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() public lang = environment.lang;
  @Output() public hovered: EventEmitter<boolean> = new EventEmitter();

  public sidenavItems: SidenavItem[] = SIDENAV_ITEMS.filter(item => !item.hidden);

  constructor(
    public readonly sidenavService: SidenavService,
    public readonly loginService: LoginService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn() || !this.loginService.isAdmin()) {
      this.sidenavItems = this.sidenavItems.filter(item => item.role !== 'admin');
    }
  }

  public onMouseover(hovering: boolean): void {
    this.sidenavService.setExpanded(hovering);
  }

  public onSidenavItemClick(item: SidenavItem, event: Event): void {
    event.preventDefault();
    if (this.sidenavService.getMobileDisplay() && !this.sidenavService.getExpanded()) {
      this.sidenavService.setExpanded(true);
    } else {
      this.navigate(item);
      this.sidenavService.setCurrentEntityName('');
    }
  }

  private navigate(item: SidenavItem): void {
    this.router.navigate([item.link]);
  }
}
