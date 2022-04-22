import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/transaction';
import { TYPE_DEFAULT_BUDGET } from 'src/app/shared/transaction-constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions_url = '/server/api/v1/transactions';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.transactions_url}/list`)
  }

  create(transactions: Transaction[]) {
    return this.http.post(`${this.transactions_url}`, transactions)
  }

  read(id: number) {
    return this.http.get(`${this.transactions_url}${id}`)
  }
  
  update(transaction: Transaction) {
    return this.http.put(`${this.transactions_url}${transaction.id}`, transaction)
  }

  delete(id: number) {
    return this.http.delete(`${this.transactions_url}/${id}`)
  }

  searchByDate(startDate: string, endDate: string) {
    return this.http.get(`${this.transactions_url}/search?startDate=${startDate}&endDate=${endDate}`);
  }

  search(startDate: string = null, endDate: string = null, type: string = null, category: string = null, tags: string = null) {
    let urlParams = ''
    urlParams += startDate ? `startDate=${startDate}&` : '';
    urlParams += endDate ? `endDate=${endDate}&` : '';
    urlParams += type ? `type=${type}&` : '';
    urlParams += category ? `category=${category}&` : '';
    urlParams += tags ? `tags=${tags}` : '';
    return this.http.get(`${this.transactions_url}/search?${urlParams}`);
  }

  getDefaultBudget() {
    return this.http.get(`${this.transactions_url}/search?type=${TYPE_DEFAULT_BUDGET}`)
  }

  uploadTransactions(source: string, file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.transactions_url}upload-transactions?source=${source}`, formData)
  }

}
