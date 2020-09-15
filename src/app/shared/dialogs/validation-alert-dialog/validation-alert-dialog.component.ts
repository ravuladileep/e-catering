import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-alert-dialog',
  templateUrl: './validation-alert-dialog.component.html',
  styleUrls: ['./validation-alert-dialog.component.scss']
})
export class ValidationAlertDialogComponent implements OnInit {
  public message;
  constructor() { }

  ngOnInit(): void {
  }

}
