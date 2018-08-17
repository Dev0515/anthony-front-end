import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userService: UserService, private _alert: AlertsService,  private route: Router) { }

  logoImg:String; 
  userId: String = ''; 
  forgotForm: FormGroup;
  resetForm: FormGroup;
  firstform: Boolean = false;
  secondform: Boolean = true;
  pass_matched: Boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.logoImg = 'assets/images/logo.png';

    this.resetForm = new FormGroup ({
      password: new FormControl('', [ Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [ Validators.required])
    });
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
          this._alert.create('success', data.message);  
          var navigater = this.route;
          setTimeout(function(){
            navigater.navigate(['/login']);
          },2000);
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
}
