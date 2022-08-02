import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpRequestService {
  private rootUrl = environment.apiUrl;

  public httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  /** GET ALL */
  getRequest(getUrl: string): Observable<any> {
    const url = `${this.rootUrl}/${getUrl}`;
    return this.http.get<any[]>(url).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /** POST */
  postRequest(postUrl: string, data: any): Observable<any> {
    const url = `${this.rootUrl}/${postUrl}`;
    return this.http.post<any>(url, data, this.httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
