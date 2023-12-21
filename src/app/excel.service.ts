import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  private baseUrl = 'http://localhost:3000'; // Replace with your actual NestJS server URL

  constructor(private http: HttpClient) {}

  exportToExcel() {
    const url = `${this.baseUrl}/excel/exportToExcel`;
    return this.http.get(url, {
      responseType: 'arraybuffer' as 'json'
    });
  }
}
