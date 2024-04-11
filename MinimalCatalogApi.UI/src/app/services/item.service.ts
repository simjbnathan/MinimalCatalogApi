import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly apiUrl = environment.apiUrl;
  readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<Item[]>(this.apiUrl, { headers });
  }

  getItemById(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.get<Item>(url, { headers });
  }

  addItem(item: Item): Observable<Item> {
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.post<Item>(this.apiUrl, item, { headers });
  }

  updateItem(item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${item.id}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.put<Item>(url, item, { headers });
  }

  deleteItem(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders().set('x-api-key', this.apiKey);
    return this.http.delete<void>(url, { headers });
  }

}
