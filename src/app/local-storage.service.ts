import {Injectable} from '@angular/core';
import {UrlDictionary} from "../interfaces/url-dictionary.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getAllLocalStorageList(): UrlDictionary[] {
    let values: UrlDictionary[] = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      let original = localStorage.getItem(keys[i]) || '';
      values.push({original, shorted: keys[i]});
    }

    return values;
  }

  updateItemToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

}
