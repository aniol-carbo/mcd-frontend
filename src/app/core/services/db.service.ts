import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DbService {

  constructor(private http: HttpClient) { }

  getItemsByQuantity(status: string, startDate: number, endDate: number, orderBy: string): Promise<any>{
    return this.http.get(`http://localhost:3000/api/db/transactions/quantity/${status}?orderBy=${orderBy}&startDate=${startDate}&endDate=${endDate}`).
    toPromise();
  }

  getItemsByPrice(status: string, startDate: number, endDate: number, orderBy: string): Promise<any>{
    return this.http.get(`http://localhost:3000/api/db/transactions/price/${status}?orderBy=${orderBy}&startDate=${startDate}&endDate=${endDate}`).
    toPromise();
  }

  getProductPrice(productSku: string, date: number): Promise<any>{
    return this.http.get(`http://localhost:3000/api/db/product/price?productSku=${productSku}&date=${date}`).
    toPromise();
  }

  getProductQuantity(productSku: string, date: number): Promise<any>{
    return this.http.get(`http://localhost:3000/api/db/product/quantity?productSku=${productSku}&date=${date}`).
    toPromise();
  }

}
