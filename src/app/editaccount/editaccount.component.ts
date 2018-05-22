import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilesService } from './../services/app.service';
@Component({
  selector: 'editaccount',
  styles: [],
  templateUrl: './editaccount.component.html',
  providers:[FilesService]
})
export class EditAccountComponent {
  FileItem;
  validationForm: FormGroup;
  formSubmitted = false;
  npassword="";
  oldpassword="";
  cnpassword="";
  constructor(private formBuilder: FormBuilder, private _FileService: FilesService,private route: Router) { }
  ngOnInit() {
    this.buildForm();
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    console.log(passwordKey,confirmPasswordKey)
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  buildForm() {
    this.validationForm = this.formBuilder.group({
      oldpassword: this.formBuilder.control(null, [Validators.required]),
      npassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      cnpassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(5)]),
      // requiredMinMaxLength: this.formBuilder.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      // requiredPatternFoo: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^foo$/)]),
      // requiredPattern: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/)]),
    },{validator: this.matchingPasswords('npassword', 'cnpassword')});
  }
  onResetForm() {
    this.validationForm.reset();
    this.formSubmitted = false;
  }

  onSubmit() {
    let response;
    this.formSubmitted = true;
    console.log("this");
    console.log(this.oldpassword,this.npassword,this.cnpassword);
    let data={
      "current_pass": this.cnpassword,
      "new_pass": this.npassword,
      "user_name": "admin"
    }
    this._FileService
    .Update('change_password', data)
    .subscribe((res) => {
      response=res
      console.log("success==>",res)
    },
    error => console.log(error),
    () => {
     // localStorage.removeItem('currentUser');
      this.route.navigate(['/login'])
    });
  }
}

