import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DevisForm {
  lastName: string;
  firstName: string;
  job: string;
  mail: string;
  numberPhone?: string;
  projectName?: string;
  description: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class DevisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  envoyerDevis(data: DevisForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, data);
  }
}
