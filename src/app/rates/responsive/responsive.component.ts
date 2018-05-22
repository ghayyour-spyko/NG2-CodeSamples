import { Component, ViewChild, OnInit } from '@angular/core';
import { File } from './../../services/app.model';
import { FilesService } from './../../services/app.service';
import { Popup } from 'ng2-opd-popup';
@Component({
  selector: 'my-table-responsive',
  styles: [],
  templateUrl: './responsive.component.html',
  providers: [FilesService]
})
export class TableResponsiveComponent implements OnInit {
  constructor(private _FileService: FilesService) {
    console.log(this.ratesObj);
  }
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  taxable="";
  taxLabel = "";
  taxValue = "";
  feeLabel = "";
  feeBillType = "";
  feeAmountType = "";
  feeValue = "";
  ratesObj = {
    dailyRate: "",
    parkingLotId: "",
    gracePeriod: "",
    taxes: [],
    fees: []
  };
  public FileItem;
  ngOnInit() {
    this.getRates();
  }
  private getRates(): void {
    this._FileService
      .GetAll('get_rate', 'parkingLotId=7')
      .subscribe((data: File[]) => this.FileItem = data,
      error => console.log(error),
      () => {
        console.log('Get all Items complete', this.FileItem);
        this.ratesObj = this.FileItem;
        console.log('Get ratesObj Items complete', this.ratesObj);
      });
  }
  onChange(e){
    this.taxable = e.checked;
  }

  saveTax() {
    this.ratesObj.taxes.push({
      "label": this.taxLabel,
      "percentage": this.taxValue
    });
    this.taxLabel = '';
    this.taxValue = '';
    this.popup1.hide();
  }
  saveFee(index) {
    this.ratesObj.fees.push({
      "label": this.feeLabel,
      "billType": this.feeBillType,
      "category": this.feeAmountType,
      "value": this.feeValue,
      "taxable":this.taxable
    });
    console.log("fee saved",this.ratesObj);
    this.feeLabel = '';
    this.feeBillType = '';
    this.feeAmountType = '';
    this.feeValue = '';
    this.popup2.hide();
  }
  showPopup1() {
    this.popup1.options = {
      header: "Add more Tax",
      color: "#5cb85c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Add", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-success", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup1.show(this.popup1.options);
  }
  showPopup2() {
    this.popup2.options = {
      header: "Add more Fee",
      color: "#5cb85c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Add", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-success", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup2.show(this.popup2.options);
  }

  remFee(index) {
    this.ratesObj.fees.splice(index, 1);
  }

  remTax(index) {
    this.ratesObj.taxes.splice(index, 1);
  }
  saveData = (e) => {
    console.log("this.ratesObj==>", this.ratesObj.fees);
    let finalObj = {
      "dailyRate": this.ratesObj.dailyRate,
      "parkingLotId": 7,
      "garacePeriod": parseInt(this.ratesObj.gracePeriod),
      "taxes": this.ratesObj.taxes,
      "fees": this.ratesObj.fees
    }
    this._FileService
      .PostData('rate', finalObj)
      .subscribe(() => { },
      error => {
        console.log(error);
      },
      () => {
        console.log('Post DAta all Items complete')
      });
  }
}

