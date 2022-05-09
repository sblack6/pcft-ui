import { Component } from '@angular/core';
import { TYPE_TRANSACTION } from 'src/app/shared/transaction-constants';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  type = TYPE_TRANSACTION;
  source = "personal-capital"
  file: any = null;

  constructor(private transactionService: TransactionService) { }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.transactionService.uploadTransactions(this.source, this.file, this.type).subscribe((data) => {
      console.log('Uploaded transactions: ', data)
    });
  }

}
