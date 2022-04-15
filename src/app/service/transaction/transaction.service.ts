import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions_url = '/server/api/v1/transactions';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.transactions_url}/list`)
  }

  create(transaction: Transaction) {
    return this.http.post(`${this.transactions_url}`, transaction)
  }

  read(id: number) {
    return this.http.get(`${this.transactions_url}${id}`)
  }
  
  update(transaction: Transaction) {
    return this.http.put(`${this.transactions_url}${transaction.id}`, transaction)
  }

  delete(id: number) {
    return this.http.delete(`${this.transactions_url}${id}`)
  }

  uploadTransactions(source: string, file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.transactions_url}upload-transactions?source=${source}`, formData)
  }

}
