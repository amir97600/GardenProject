import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { EmailRequest } from '../model/email-request';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private API_URL: string = `${environment.apiUrl}/email`;
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public refresh() {
    this.refresh$.next();
  }

  sendEmail(emailRequest: EmailRequest): Observable<string> {
    return this.http.post(this.API_URL, {
      to: emailRequest.to,
      subject: emailRequest.subject,
      message: emailRequest.message
    },
      { responseType: 'text' });
  }
}
