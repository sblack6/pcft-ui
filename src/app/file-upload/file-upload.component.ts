import { Component } from '@angular/core';
import { TransactionService } from '../service/transaction/transaction.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  source = "personal-capital"
  file: any = null;

  constructor(private transactionService: TransactionService) { }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.transactionService.uploadTransactions(this.source, this.file).subscribe((data) => {
      console.log('Uploaded transactions: ', data)
    });
  }

}
