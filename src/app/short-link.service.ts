import {Injectable} from '@angular/core';
import {UrlDictionary} from "../interfaces/url-dictionary.interface";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ShortLinkService {
  private urlDictionary: UrlDictionary[] = [];
  private mainPath: string;

  constructor(private localStorageService: LocalStorageService) {
    this.mainPath = window.location.href;
    console.log(window.location);
    this.urlDictionary = this.localStorageService.getAllLocalStorageList();
  }

  generateShortedLink(originalLink: string): string {
    if (originalLink && this.isValidURL(originalLink)) {
    } else {
      throw new Error('link isn\'t valid.');
    }
    let shortedUrl = this.generateString(9);
    while (this.urlDictionary.find((url => url.shorted == shortedUrl))) {
      shortedUrl = this.generateString(9);
    }
    shortedUrl = this.mainPath.concat(shortedUrl);
    this.urlDictionary.push({shorted: shortedUrl, original: originalLink});
    this.localStorageService.updateItemToLocalStorage(shortedUrl, originalLink);
    return shortedUrl;
  }

  getOriginalUrlByKey(key: string): string {
    let original = this.urlDictionary.find(url => url.shorted == key)?.original;
    if (!original) {
      throw new Error('this url isn\'t exist.');
    }
    return original;
  }

  private isValidURL(url: string): boolean {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
  }

  private generateString(length: number) {
    let result = '',
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
