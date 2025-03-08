import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://67b9a31351192bd378ddfbe4.mockapi.io/api/v1/Quiz'; // ✅ MockAPI URL

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
