import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

 token : String;
 userId: String;
 backend_url: String;  
 suggestions = false; 
 suggested_friends = [];
 listusers = [];
 listfriends = [];

  constructor(private globalService: GlobalService, private userService: UserService, private route: Router) { }

  ngOnInit() {

    this.backend_url = this.globalService.backend_url;
    this.token = localStorage.getItem('token'); 
    this.userId = localStorage.getItem('UserId');

    let input = {
      'token' :  this.token,
      'user_id': this.userId
    }

    this.userService.friend_list(input).subscribe((response)  => {
      this.listfriends = response.data.friends;
      console.log('Friends => ', this.listfriends )      
    });

    this.userService.suggestedfriends(input).subscribe((response)  => {
      this.suggested_friends = response.friends;
      console.log('Sugg Friends => ', this.suggested_friends )      
    });
  }

  searchfriends(event){

    let search = event.target.value;
    
    let data = { 'search': search, 'user_id': this.userId ,'token': this.token };

    if(search){
      this.suggestions = true;
      this.userService.search_users(data).subscribe((response) => {                              
        this.listusers = response.data;  
        console.log('Search Friends => ', this.listusers);
      });
    }
    else{
      this.suggestions = false;
    }

  }

  selectuser(id){
    console.log('id', id)
    this.route.navigate(['profile',id]);
  }

  addfriend(rec_id, event){
    event.target.textContent = "Friend Request Sent";    
    //console.log('addddd', event)
    let data = {
      'sender_id' : this.userId,
      'receiver_id' : rec_id,
      'status' : 'pending',
      'token' : this.token
    };
    this.userService.send_request(data).subscribe((response) => {                              
      console.log('send reponse', response);      
    });
  }

}