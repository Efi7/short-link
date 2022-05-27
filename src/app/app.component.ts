import {Component, OnInit} from '@angular/core';
import {ShortLinkService} from "./short-link.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  shortedUrl = '';

  constructor(private shortLinkService: ShortLinkService) {

  }

  ngOnInit() {
    let currentPath = window.location.pathname;
    if (currentPath.length > 1) {
      try {
        window.location.href = this.shortLinkService.getOriginalUrlByKey(window.location.href);
      } catch (e) {
        window.location.href = window.location.origin;
        this.alert(e);
      }
    }
  }

  shortUrl(value: string) {
    try {
      this.shortedUrl = this.shortLinkService.generateShortedLink(value);
    } catch (e) {
      this.alert(e);
    }
  }

  alert = (value: string) => alert(value);
}
