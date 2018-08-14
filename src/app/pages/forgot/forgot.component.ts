import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private userService: UserService, private _alert: AlertsService,  private route: Router) { }

  logoImg:String; 
  userId: String = ''; 
  forgotForm: FormGroup;
  resetForm: FormGroup;
  firstform: Boolean = true;
  secondform: Boolean = false;
  pass_matched: Boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.logoImg = 'assets/images/logo.png';

    this.forgotForm = new FormGroup ({
      email: new FormControl('', [ Validators.required,  Validators.pattern(this.emailPattern)]),
    });

    this.resetForm = new FormGroup ({
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [ Validators.required])
    });
  }

  forgot(){
    
    this.userService.forgot_password(this.forgotForm.value).subscribe(

      data => {
        this.firstform = false;
        this.secondform = true;
        this.userId = data.user._id;        
      }, 
      err => {
        console.log('error message => ', err.error.message);
        let message = err.error.message;
        const type = 'error';
        this._alert.create(type, message);
      }

    ); 
       
  }

  reset(){

    if(this.resetForm.value.password !== this.resetForm.value.confirm_password){
      this.pass_matched = true;      
    } else {
         
      let newdata = this.resetForm.value;
      newdata.id = this.userId;
      
      this.userService.reset_password(newdata).subscribe(

        data => {
          this.pass_matched = false;     
          this.route.navigate(['/login']);               
        }, 
        err => {
          console.log('error message => ', err.error.message);
          let message = err.error.message;
          const type = 'error';
          this._alert.create(type, message);
        }
  
      ); 

    }  
    
  } 

  BacktoForgot(){
    this.firstform = true;
    this.secondform = false; 
  }

}
