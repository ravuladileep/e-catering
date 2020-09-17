import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-validation-alert-dialog',
  templateUrl: './validation-alert-dialog.component.html',
  styleUrls: ['./validation-alert-dialog.component.scss']
})
export class ValidationAlertDialogComponent implements OnInit {
  public message;
  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalRef.hide();
  }

}
