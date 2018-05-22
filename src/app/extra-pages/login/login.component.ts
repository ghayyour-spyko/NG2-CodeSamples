import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { File } from './../../services/app.model';
import { FilesService } from './../../services/app.service';


@Component({
  selector: 'my-page-login',
  styles: [],
  templateUrl: './login.component.html',
  providers: [FilesService]
})

export class PageLoginComponent {
  LoginForm: FormGroup;
  formSubmitted = false;
  username = "";
  pass = "";
  cnpassword = "";
  public FileItem;
  constructor(private formBuilder: FormBuilder, private route: Router, private _FileService: FilesService) { }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.LoginForm = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      pass:this.formBuilder.control(null, [Validators.required])
      
    });
  }
  loginSubmit() {
    console.log(this.username,this.pass);
    let reqData={
      "userName" : this.username,
      "pass" : this.pass
    };
    // post API call
      this._FileService
        .PostData('login', reqData)
        .subscribe((data: File[]) => this.FileItem = data,
        error => {
          console.log(error);
        },
        () => {
          console.log('Post DAta all Items complete')
          console.log(this.FileItem);
          localStorage.setItem('currentUser', JSON.stringify({ token: this.FileItem.token}));
          this.route.navigate(['/dashboard'])
        });
  }
}