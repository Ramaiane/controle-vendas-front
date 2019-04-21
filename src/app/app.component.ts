import { Component, Renderer, OnInit } from '@angular/core';
import { HTTPStatus } from './service/RxJS/HTTPStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  menuClick: boolean;

  menuButtonClick: boolean;

  topbarMenuButtonClick: boolean;

  topbarMenuClick: boolean;

  topbarMenuActive: boolean;

  activeTopbarItem: Element;

  layoutStatic: boolean;

  sidebarActive: boolean;

  mobileMenuActive: boolean;

  darkMenu: boolean;

  constructor(public renderer: Renderer, private httpStatus: HTTPStatus) { }
  loading = false;
  
  ngOnInit() {
    this.httpStatus.getHttpStatus().subscribe((isInFlight: boolean) => {
      // https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
      setTimeout(() => {
        this.loading = isInFlight;
      }, 0);
    });

    //  this.sidebarActive = true;
  }

  onWrapperClick() {
    if (!this.menuClick && !this.menuButtonClick) {
        this.mobileMenuActive = false;
    }

    if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
        this.topbarMenuActive = false;
        this.activeTopbarItem = null;
    }

    this.menuClick = false;
    this.menuButtonClick = false;
    this.topbarMenuClick = false;
    this.topbarMenuButtonClick = false;
  }
  onMenuButtonClick(event: Event) {
    this.menuButtonClick = true;

    if (this.isMobile()) {
        this.mobileMenuActive = !this.mobileMenuActive;
    }

    event.preventDefault();
  }

  isMobile() {
    return window.innerWidth < 640;
  }

  onTopbarMobileMenuButtonClick(event: Event) {
      this.topbarMenuButtonClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;
      event.preventDefault();
  }

  onTopbarRootItemClick(event: Event, item: Element) {
      if (this.activeTopbarItem === item) {
          this.activeTopbarItem = null; } else {
          this.activeTopbarItem = item; }

      event.preventDefault();
  }

  onTopbarMenuClick(event: Event) {
      this.topbarMenuClick = true;
  }

  onSidebarClick(event: Event) {
      this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
      this.layoutStatic = !this.layoutStatic;
  }
}
