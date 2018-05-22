import { File } from './../services/app.model';
import { FilesService } from './../services/app.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CHARTCONFIG } from '../charts/charts.config';
import { Popup } from 'ng2-opd-popup';



@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    chart {
        display: block;
      }
      `],
  providers: [FilesService]
})
export class DashboardComponent implements OnInit {
  constructor(private _FileService: FilesService) {
  }
  ngOnInit() {
    this.getWeekData();
    let s = this.startDate();
    let e = this.endDate();
    // console.log("start", s, "end", e);

  }

  @ViewChild('popup1') popup1: Popup;
  config = CHARTCONFIG;
  period = "weekly";
  start_date = "";
  oneDayRecord = {};
  options2;
  seriesData = [];
  oneDayData = [];
  data = {
    "parkingLotId": "1",
    "product": "valet uncovered",
    "type": "Check In",
    "start_date": "Sept 1, 2017",
    "end_date": "Sept 20, 2017",
    "numberOfCars": 5,
    "overrideDays": 3
  };
  public FileItem;

  hidePopup1() {
    this.popup1.hide();
  }
  showPopup1(date) {
    this.popup1.options = {
      header: date,
      color: "#5cb85c", // red, blue....
      widthProsentage: 70, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: false, // You can hide this in case you want to use custom buttons
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup1.show(this.popup1.options);
  }
  // Test call of the API to get data_by_da and date=10-aug
  private getAllItems(): void {
    this._FileService
      .GetAll('data_by_day', 'date=10-aug')
      .subscribe((data: File[]) => this.FileItem = data,
      error => console.log(error),
      () => {
        console.log('Get all Items complete')
        console.log(this.FileItem);
      });
  }
  // Get Specifi data 
  private get_dateData(date): void {
    this._FileService
      .GetAll('data_by_day', "date=" + date + "&parkingLotId=7")
      .subscribe((data: File[]) => this.FileItem = data,
      error => {

      },
      () => {
        this.oneDayData = this.FileItem;
        console.log("one day data", this.oneDayData)
        this.showPopup1(date);
      });

  }

  private getWeekData(): void {
    this._FileService
      .GetAll('data_by_week', 'parkingLotId=7')
      .subscribe((data: File[]) => this.FileItem = data,
      error => console.log(error),
      () => {
        console.log('Get all Items complete', this.FileItem.yData[0]);
        this.seriesData = [];
        console.log("Response : ", this.FileItem);
        this.FileItem.yData.map((item) => {
          this.seriesData.push(item);
        })
        this.options2 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          yAxis: {
            title: {
              text: ''
            }
          },
          xAxis: {
            categories: this.FileItem.xData.key
          },

          plotOptions: {
            series: {
              // pointStart: 2010,
              point: {
                events: {
                  click: (e) => {
                    console.log('e==>', e.point.category)
                    this.get_dateData(e.point.category)
                  }
                }
              }
            },

          },

          series: this.seriesData
        }

      });
  }
  private getMonthlyData(): void {
    var stDate = this.startDate();
    var endDate = this.endDate();
    console.log(this.startDate());
    console.log(this.endDate());
    this._FileService
       .GetAll('data_for_last_30_days', "&parkingLotId=7")
      // .GetAll('data_by_month', "&parkinglot_id=7")
      .subscribe((data: File[]) => this.FileItem = data,
      error => console.log(error),
      () => {
        console.log('Get all Items complete', this.FileItem);
        this.seriesData = [];
        this.FileItem.yData.map((item) => {
          this.seriesData.push(item);
        })
        this.options2 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          yAxis: {
            title: {
              text: ''
            }
          },
          xAxis: {
            categories: this.FileItem.xData.key
          },

          plotOptions: {
            series: {
              // pointStart: 2010,
              point: {
                events: {
                  click: (e) => {
                    console.log('e==>', e.point.category)
                    this.get_dateData(e.point.category)
                  }
                }
              }
            },

          },

          series: this.seriesData
        }

      });
  }
  startDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth(); //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let startdate = year + "-" + month + "-" + day;
    return startdate;

  }
  endDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let endDate = year + "-" + month + "-" + day;
    return endDate;

  }
}
