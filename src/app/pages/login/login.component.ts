import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logoImg:String;
  signinImg: String;
  RegisterData = {};
  loginForm: FormGroup;
  signupForm1: FormGroup;
  signupForm2: FormGroup;
  pass_matched: Boolean = false;
  already_exists: Boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  unamePattern = "^[A-Za-z0-9_]{5,50}$";
  phonePattern = "^[0-9]+$";
  countries: any;
  isCheckedTerms: boolean = false;
  showTermsMessage : boolean = false;

  constructor(private userService: UserService, private _alert: AlertsService, private route: Router) {

  }

  ngOnInit() {

    this.logoImg = 'assets/images/logo.png';
    this.signinImg = 'assets/images/signin.png';

    this.loginForm = new FormGroup ({
      email: new FormControl('', [ Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [ Validators.required])
    });

    this.signupForm1 = new FormGroup ({
      name: new FormControl('', [ Validators.required]),
      email: new FormControl('', [ Validators.required,  Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      repeat_password: new FormControl('', [ Validators.required ])
    });

    this.signupForm2 = new FormGroup ({
      username: new FormControl('', [ Validators.required, Validators.pattern(this.unamePattern)]),
      dob: new FormControl('', [ Validators.required]),
      phone_no: new FormControl('', [ Validators.required, Validators.pattern(this.phonePattern)]),
      country: new FormControl('', [ Validators.required])
    });

    this.userService.get_countries().subscribe((response) => {
      this.countries = response.data;
      //this.countries = Array.of(this.countries);       
    });

  }

  login(){
    this.userService.login(this.loginForm.value).subscribe(           // Successful responses call the first callback.
      data => {
        let token = data.token;
        let user_id = data.user._id;
        localStorage.setItem('token', token);
        localStorage.setItem('UserId', user_id);
        this.route.navigate(['/home']);
        this._alert.create('success', 'Successfully login');
        this.userService.online(user_id).subscribe((response) =>{
          console.log("response user is online ==>");
        });
      },
      err => {
        console.log('error message => ', err.error.message);
        let message = err.error.message;
        const type = 'error';
        this._alert.create(type, message);
      }
    );
  }

  checkAgreement(ischecked) {
    if (ischecked) {
      this.isCheckedTerms = true;
      this.showTermsMessage = false;
    }
    else {
      this.isCheckedTerms = false;
      this.showTermsMessage = true;
    }
  }

  signup1(){
    let data = { 'email' : this.signupForm1.value.email };
    this.userService.checkemail(data).subscribe(

      data => {
        //console.log('unique');
        this.already_exists = false;
        if(this.signupForm1.value.password !== this.signupForm1.value.repeat_password){
          this.pass_matched = true;
        } else {
          this.pass_matched = false;
          document.getElementById("step1").style.display = "none";
          document.getElementById("step2").style.display = "block";
          Object.assign(this.RegisterData, this.signupForm1.value);
        }
      },
      err => {
        // console.log('already exists');
        this.already_exists = true;
      }

    );
  }

  signup2(){
    if(this.isCheckedTerms)
    {
      this.showTermsMessage = false;
      this.signupForm2.value.dob = moment(this.signupForm2.value.dob).format('DD-MM-YYYY');
      Object.assign(this.RegisterData, this.signupForm2.value);
      this.userService.register(this.RegisterData).subscribe((response) => {
      console.log('Final res', response);
      this._alert.create('success', 'Successfully register');
      if(response.success && response.message== "Register successfully.")
      {
        this.loginForm.patchValue({"email" : this.signupForm1.value.email});
        this.loginForm.patchValue({"password" : this.signupForm1.value.password});
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.login();
      }, 1000);
      }
    });
  }
  else
  {
    this.showTermsMessage = true;
  }
  }

  changeForm(){
    document.getElementById("form-bloc").style.opacity = "0";
    document.getElementById("form-bloc").style.visibility = "hidden";
    document.getElementById("form-bloc2").style.opacity = "1";
  }

  Backtologin(){
    document.getElementById("form-bloc2").style.opacity = "0";
    document.getElementById("form-bloc").style.opacity = "1";
    document.getElementById("form-bloc").style.visibility = "visible";
  }

  BacktoSignup1(){
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
  }


}
