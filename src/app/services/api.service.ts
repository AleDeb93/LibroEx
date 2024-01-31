import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://openlibrary.org';

  limit: number = 15;
  offset: number = 0;
  subject: string = 'love';

  constructor(private http: HttpClient) { }

  searchForSubjects(cat: string, l: number, o: number): Observable<any> {
    const subjectUrl: string = `${this.baseUrl}/subjects/${cat}.json?limit=${l}&offset=${o}`;
    return this.http.get(subjectUrl);
  }
}
