import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
//import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-media.component.html',
	styleUrls: ['./edit-media.component.css']
})
export class EditMediaComponent implements OnInit {

	userId: String;
	backend_url: String;
	param_id: String;
  token: String;
  user_id: String;
	editForm: FormGroup;
	medias = [];
	posts = [];
	index = 1;
	userInfo = {};

	//constructor(private globalService: GlobalService, private userService: UserService, private route: Router) { }
	constructor(private globalService: GlobalService, private userService: UserService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(
      params => {
        this.param_id = params.id;
      });
  }

	ngOnInit() {
		this.editForm = new FormGroup({
			username: new FormControl('', [Validators.required])
		});
		this.backend_url = this.globalService.backend_url;
    this.userId = localStorage.getItem('UserId');
    this.token = localStorage.getItem('token');
    //let data = { 'user_id': this.userId, 'token': this.token };
		this.userInfo = {
			'user_id': this.userId,
      'id': this.param_id,
      'token': this.token
		}
		this.fetchInitialData(this.userInfo);

	}
  fetchInitialData(data){
		this.userService.getMediapost(data).subscribe((response) => {
			for (var media = 0; media < response.data.length; media++) {
        this.posts[media] = [];
        this.posts[media]['name'] = response.name;
        this.posts[media]['id'] = response.postId[media];
        this.posts[media]['likes'] = response.count[media];
				this.posts[media]['index'] = media;
			
				for (var post = 0; post < response.data[media].length; post++) {    // Get media files from post
          this.posts[media][post] = [];
          var ext = response.data[media][post].split(".").pop();     //To check extension of mediafiles
          if (ext == 'mov' || ext == 'mp4' || ext == 'mkv' || ext == 'avi' || ext == 'webm') {
            //Get posts id
            this.posts[media][post]['post'] = response.data[media][post];
            // Get mediafile type        
            this.posts[media][post]['type'] = 'video';
					} 
					else if (ext == 'gif' || ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
            this.posts[media][post]['post'] = response.data[media][post];
						this.posts[media][post]['type'] = 'image';
					}
					this.posts[media][post]['itemId'] = response.postItemIds[media][post];
        }
			}

		});
	}
	editMediaItems(postId, itemId, oldfilename,e: Event) {
			const target: HTMLInputElement = e.target as HTMLInputElement;
		var length = target.files.length;
		var _self = this;
    for(var i=0; i<length; i++){
			let file = target.files[i];
			let filename = file.name;
      let data = { 'id' : this.userId, 'postId' : postId, 'itemId' : itemId, 'upload_file' : file,'oldfile' :oldfilename, 'token' : this.token};
			 this.userService.upload_media(data).subscribe((response)  => {  
		 	 _self.fetchInitialData(this.userInfo);
 });
  	}
		window.alert("File is uploaded.");
	
	}


	/*deletemediapost(postId, itemId, oldfilename,e: Event) {
	
 let data = { 'id' : this.userId, 'postId' : postId, 'itemId' : itemId};
			 this.userService.delmedia(data).subscribe((response)  => {
				this.fetchInitialData(this.userInfo);
 });
	}*/
}


