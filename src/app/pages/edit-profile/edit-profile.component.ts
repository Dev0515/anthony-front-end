import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
 
})
export class EditProfileComponent implements OnInit {
  
 userId : String;
 token: String;
 editForm: FormGroup;
 countries:String;

  constructor(private globalService: GlobalService, private userService: UserService, private route: Router) { }

  ngOnInit() {

    this.editForm = new FormGroup ({
      name: new FormControl('', [ Validators.required]),
      username: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required]),
      dob: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      phone_no: new FormControl('',[Validators.required]),
      user_id: new FormControl('',[Validators.required])
    });

    
    this.userId = localStorage.getItem('UserId');
    this.token = localStorage.getItem('token');
    
    this.userService.get_countries().subscribe((response) => {
    this.countries = response.data;
          
    });

    let data = { 'user_id': this.userId, 'token' : this.token };
    this.userService.userProfile(data).subscribe((response)  => {
    this.editForm.get('name').setValue(response.data.name);
    this.editForm.get('username').setValue(response.data.username);
    this.editForm.get('email').setValue(response.data.email);
    this.editForm.get('dob').setValue(response.data.dob);
    this.editForm.get('country').setValue(response.data.country);
    this.editForm.get('phone_no').setValue(response.data.phone_no);
    this.editForm.get('user_id').setValue(response.data._id);


    });
 }

 
 editprofile(){
   console.log("edit profile function");
   this.userService.editprofile(this.editForm.value).subscribe((response) =>{
    alert( 'Successfully updated');
    this.route.navigate(['/home']);
   });

  }

}


