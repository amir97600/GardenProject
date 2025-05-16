import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  private baseUrl = 'http://localhost:8080/api';
  private baseUploadUrl = 'http://localhost:8080/uploads';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}/upload`, formData, {
    reportProgress: true,
    observe: 'events'
  });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}files`);
  }

  getFileUploaded(filename: string| undefined): string  {
    return `${this.baseUploadUrl}/${filename}`;
  }
}
