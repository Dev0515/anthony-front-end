import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatService } from '../../services/chat.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: String;
  username: String;
  profile_pic: String = '';
  backend_url: String;  
  country: String;
  token : String;
  friendreq_alerts : Boolean = false;
  total_friendreq : Number = 0;
  friendrequests = [];  
  profilepicForm: FormGroup;
  statusForm: FormGroup;
  uload_file:String;
  showstatus:Boolean;
  Status :String;
  status:String;
  getallstatus:Boolean;
  userstatus:Boolean;
  Message:String;
  suggested_friends:String;
  medias = [];
  posts = [];
  message:String;
  messages = [];
  listfriends = [];
  otherid:String;
  chatboard:Boolean= false;
  chatid = [];
  otherId:String;
  userid:String;
  senderid :String;

 
 constructor(private globalService: GlobalService, private userService: UserService, private route: Router,private chatService: ChatService) { }


  ngOnInit() {
    

    this.chatService
    .getMessages()
    .subscribe((message) => {
      this.messages.push(message);
      this.messages.push(message.senderid);
      this.chatid = message.id;
    });
  
    this.backend_url = this.globalService.backend_url;
    this.userId = localStorage.getItem('UserId');
    this.token = localStorage.getItem('token'); 
    let uid = { 'id': this.userId, 'token' : this.token };
    console.log("userid", this.userId);
    this.profilepicForm = new FormGroup ({
      profile_pic: new FormControl('', [])
    });

    this.statusForm = new FormGroup ({
      status: new FormControl('', [ Validators.required])
    });

    this.userService.current_user(uid).subscribe((response)  => {
      this.username = response.data.name;
      this.profile_pic = response.data.profile_pic;
      this.country = response.data.country;
    });

    let data = { 'user_id': this.userId, 'token' : this.token };

    this.userService.friend_list(data).subscribe((response)  => {
      this.listfriends = response.data.friends;
    });

 this.userService.get_status(uid).subscribe((response) => {
   this.Status = response.data;
  this.getallstatus = true;
  });


    this.userService.friendreq_alerts(uid).subscribe((response)  => {
      this.friendrequests = response.data;
     // if(this.friendrequests.length > 0){
        //this.friendreq_alerts = true;
        this.total_friendreq = 5;
        //this.total_friendreq = this.friendrequests.length;
     // }
      console.log('Friend Requests =>', this.friendrequests);
    }); 

    !function(t,e,i,n){function s(e,i){this.element=e,this.options=t.extend({},o,i),this._defaults=o,this._name=a,this.init()}var a="chatBubble",o={typingSpeed:40,delay:1e3};s.prototype={init:function(){function i(){n.addMessage(n.element,s[u],o).then(function(){e.setTimeout(function(){u++,u<a&&i()},l)})}var n=this;t(n.element).addClass("cb__list");var s=this.options.messages,a=s.length,o=this.options.typingSpeed||this.defaults.typingSpeed,l=this.options.delay||this.defaults.delay,u=0;i()},addMessage:function(i,n,s){var a=t("<li></li>"),o=t('<div class="bubble typing">...</div>'),l=n.split(" ").length,u=l/s*6e3;return u<1e3&&(u=1e3),u>1e4&&(u=1e4),a.html(o),t(i).append(a),new Promise(function(t,i){e.setTimeout(function(){o.html(n).removeClass("typing"),t(!0)},u)})}},t.fn[a]=function(e){return this.each(function(){t.data(this,"plugin_"+a)||t.data(this,"plugin_"+a,new s(this,e))})}}($,window,document);
    let messages = ['Salut Ben', 'Salut Anthony', 'Comment vas-tu?', 'Bien et toi?', 'Ca va aussi, quoi de neuf chez toi?', 'Rien de special...et chez toi?', 'Une PS4 que je vais te faire parvenir pour noel', 'ha bon! cool'];

    $('#messages').chatBubble({
      messages: messages,
      typingSpeed: 30000
    });

   

    $( document ).ready(function() {
      $('ul.tab-nav li a.button').click(function() {
  
          var href = $(this).attr('href');
  
          $('li a.active.button', $(this).parent().parent()).removeClass('active');
          $(this).addClass('active');
  
          $('.tab-pane.active', $(href).parent()).removeClass('active');
          $(href).addClass('active');
  
          return false;
      });
    });
  }


  rightbar(event){    
    event.preventDefault();
    $('.cd-panel2').addClass('is-visible');
  }

  closerightbar(event){
    if( $(event.target).is('.cd-panel2') || $(event.target).is('.cd-panel-close') ) { 
      $('.cd-panel2').removeClass('is-visible');
      event.preventDefault();
    }
  }

  logout(){
 
    let data = { 'user_id' : this.userId, 'token' : this.token};
    this.userService.logout(data).subscribe((response)  => {
        console.log('Current Profile => ', response );  
      });
      localStorage.removeItem('token');
      localStorage.removeItem('UserId');    
      this.route.navigate(['/login']);
  }

  uploadProfilePic(e: Event){       
    const target: HTMLInputElement = e.target as HTMLInputElement;
    let file = target.files[0];
    let data = { 'id' : this.userId, 'profile_pic' : file, 'token' : this.token};
    let reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
       $('#profile_image').attr('src', e.target.result);
      };
    })();
    reader.readAsDataURL(file);

  this.userService.uploadprofilepic(data).subscribe((response)  => {
      console.log('Current Profile => ', data)     
    });
  }

  uploadfile(e: Event){       
    const target: HTMLInputElement = e.target as HTMLInputElement;
    var length = target.files.length;
    for(var i=0; i<length; i++){
      let file = target.files[i];
      let data = { 'id' : this.userId, 'upload_file' : file, 'token' : this.token};
    this.userService.upload_file(data).subscribe((response)  => {
        console.log('Current Profile => ', response );  
      });
  }
  window.alert("File is uploaded.");
  location.reload();
  }


  senderprofile(id){
    console.log('id', id)
    this.route.navigate(['profile',id]);
  }

  addstatus(){
    let data = {
      'user_id' : this.userId,
      'status'  : this.statusForm.value.status,
      'token'   : this.token
    };
    this.userService.status(data).subscribe((response) => {
      if(response.success == true){
        this.Message = response.message;
        this.showstatus = true;
        this.getallstatus = true;
        
      }
      if(response.success == false){
        this.getallstatus = true;
        this.status= response.data.status;
        this.userstatus = true;
      }
      
    
    })
    
    console.log('Status => ', data);
    this.statusForm.reset();
   
  }
  suggestfriend(){
    
    let data = {
      'user_id' : this.userId,
      'token'   : this.token
    }
    this.userService.suggestedfriends(data).subscribe((response)  => {
      this.suggested_friends = response.friends;
      
      console.log('Sugg Friends => ', this.suggested_friends )      
    });
    
  }

selectuser(id){
  console.log('id', id)
  this.route.navigate(['profile',id]);
}
media(){
  let uid = { 'user_id': this.userId, 'token' : this.token }
  this.userService.mediauser(uid).subscribe((response) => {
    for(var i= 0; i< response.data.length; i++){
      var extn = response.data[i].split(".").pop();
      if(extn == 'jpg' || extn == 'jpeg' || extn == 'gif' || extn == 'png'){
       this.medias[i] = response.data[i];
       this.medias['type'] ='image';
      }
      if(extn == 'mov' || extn == 'mp4' || extn == 'webm' || extn == 'avi'){
        this.medias[i] = response.data[i];
        this.medias['type'] = 'video';

      }
      
    }
  });
}

edit(){
  console.log("function working", this.userId);
  this.route.navigate(['edit']);
 }

 chat(otherid){
   this.otherid = otherid;
   console.log("other id=>=>",otherid);
   this.chatboard = true;
}
sendMessage(event,otherid){
  this.message = event.target.value;
  this.otherid = otherid;
  this.chatService.sendMessage(this.message,this.userId,this.otherid);
  this.message = event.target.value = '';
}

}
