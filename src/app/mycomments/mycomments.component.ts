import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-mycomments',
  templateUrl: './mycomments.component.html',
  styleUrls: ['./mycomments.component.css']
})
export class MycommentsComponent implements OnInit {
  token : String;
  userId: String;
  backend_url: String;  
  medias = [];
   posts = [];
   index = 1;
   userInfo = {};


  constructor(private globalService: GlobalService, private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.route.navigate(['/mycomment']);
    this.backend_url = this.globalService.backend_url;
    this.token = localStorage.getItem('token'); 
    this.userId = localStorage.getItem('UserId');

    this.userInfo = {
      'token' :  this.token,
      'user_id': this.userId
    }
    this.fetchInitialData(this.userInfo);
   
  }
  fetchInitialData(data){
    this.userService.getusercomment(data).subscribe((response)=>{
      console.log(response);
      
for (var media = 0; media < response.data.length; media++) {
        this.posts[media] = [];
       this.posts[media]['user_id'] = response.user_id;
      this.posts[media]['data'] = response.data;
      this.posts[media]['comment_data'] = response.comment_data;
      this.posts[media]['commentid'] = response.commentid;
      for (var post = 0; post < response.data[media].length; post++) { 
        this.posts[media][post] = [];
      
        var ext = response.data[media][post].split(".").pop();     //To check extension of mediafiles
        if (ext == 'mov' || ext == 'mp4' || ext == 'mkv' || ext == 'avi' || ext == 'webm') {
         this.posts[media][post]['post'] = response.data[media][post];
          this.posts[media][post]['type'] = 'video';
        } 
        else if (ext == 'gif' || ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
          this.posts[media][post]['post'] = response.data[media][post];
          this.posts[media][post]['type'] = 'image';
        }
        this.posts[media][post]['post_id'] = response.post_id[media][post];

      }
    }
      
    });
  }

}
