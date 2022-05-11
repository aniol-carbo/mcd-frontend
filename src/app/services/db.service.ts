import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DbService {

  constructor(private http: HttpClient) { }

  getItems(status: string, startDate: number, endDate: number, orderBy: string): Promise<any>{
    return this.http.get(`http://localhost:3000/api/db/${status}?orderBy=${orderBy}&startDate=${startDate}&endDate=${endDate}`).
    toPromise();
  }

}
