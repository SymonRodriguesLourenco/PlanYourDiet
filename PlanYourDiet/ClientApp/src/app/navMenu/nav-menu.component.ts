import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-menu',
  templateUrl: 'nav-menu.component.html',
  styleUrls: ['nav-menu.component.css'],
})


export class NavMenuComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  currentUser: User;
  links = ['personal page', 'youtube.com', 'facebook.com'];


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.mobileQuery = media.matchMedia(' (max-width: 600px) ');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('../../assets/mdi.svg'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  @ViewChild('sidenav', {static: true}) sidenav : MatSidenav;


  close() {
    this.sidenav.close();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
