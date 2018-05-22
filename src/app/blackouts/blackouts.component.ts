import { Component, ViewChild, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilesService } from './../services/app.service';
import { File } from './../services/app.model';
import { Popup } from 'ng2-opd-popup';
import moment from 'moment';
@Component({
  selector: 'blackouts',
  styles: [`.material-icons{ font-size:18px;}`],
  templateUrl: './blackouts.component.html',
  providers: [FilesService]
})
export class BlackoutsComponent implements OnInit{
  
  constructor(private _FileService: FilesService, private formBuilder: FormBuilder) { }
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  updateSlots: FormGroup;
  Response;
  FileItem;
  maxSlots="";
  service="";
  type="";
  start_date="";
  end_date="";
  cars="";
  overide="";
  new_blackout={};
  blackouts=[];

  buildForm() {
    this.updateSlots = this.formBuilder.group({
      maxSlots: this.formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit(){
    this.buildForm();
    this.getAllBlackouts();
    this.getPrakingLotMax();
  }

  updateMaxSlots(){
    let obj={
      "parkingLotId":"7",
      "maxSlots":this.maxSlots
    }
    this.updatePrakingLotMax(obj);
  }

  getPrakingLotMax(){
    this._FileService
    .GetAll('get_parking_lot_max_slot', 'parkingLotId=7')
    .subscribe((data: any) => this.maxSlots = data.maxSlots,
    error => console.log(error),
    () => {
      (<HTMLInputElement>document.getElementById("inputEmail3")).value = this.maxSlots;
    });

  }
  

  updatePrakingLotMax(obj){
    this._FileService
    .Update('update_parking_lot_max_slot', obj )
    .subscribe((data: any) => console.log(data),
    error => console.log(error),
    () => {
      console.log("updated");
    });

  }

  getAllBlackouts(){
    this._FileService
    .GetAll('get_blackout', 'parkingLotId=7')
    .subscribe((data: File[]) => this.FileItem = data,
    error => console.log(error),
    () => {
      console.log(this.FileItem);
      this.blackouts = this.FileItem.blackouts.map((obj)=>{
        return obj
      })
    });
  }


  saveBlackout(blackout){
    console.log("new blackout about to save",blackout)
    this._FileService
    .PostData('add_blackout', blackout)
    .subscribe(() => {},
    error => console.log(error),
    () => {
      this.popup1.hide();
      this.getAllBlackouts();
      console.log("posted successfully");
    });
  }

  deleteBlackout(index, blackout) {
    let obj={
      "parkingLotId": this.FileItem.parkingLotId,
      "id": blackout.id
    }
      this._FileService
      .PostData('remove_blackout', obj)
      .subscribe((res) => {
        this.Response =res;
      },
        error => console.log(error),
        () => {
        console.log("deleted successfully", this.Response);
        this.blackouts.splice(index, 1);
      });
  }


  addBlackout(index) {

    var st_date = moment(this.start_date).format("MMM DD, YYYY");
    var en_date = moment(this.end_date).format("MMM DD, YYYY");
    console.log(st_date.toString());
    this.new_blackout={
      "parkingLotId": "7",
      "product":this.service,
      "type":1,
      "startDate":st_date.toString(),
      "endDate":en_date.toString(),
      "numberOfCars":this.cars,
      "overrideDays":this.overide,
    }
    console.log("adding new blackout==>",this.new_blackout)
    this.saveBlackout(this.new_blackout);
    }


  showPopup1() {
    this.popup1.options = {
      header: "Add Blackout",
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

  remFee(index) {
    this.blackouts.splice(index, 1);
  }
}

