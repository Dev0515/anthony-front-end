import { Component, OnInit,ViewChild,ElementRef,TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatService } from '../../services/chat.service';
import { FileUploader } from 'ng2-file-upload';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',  
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public uploader:FileUploader ;
  user_id: String;
  modalRef: BsModalRef;
  userId: String;
  showcomment: Boolean = false;
  showcomments: Boolean = false;
  username: String;
  indexs: String;
  allcomments = [];
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
  comments: String;
  getallstatus:Boolean;
  userstatus:Boolean;
  Message:String;
  suggested_friends:String;
  medias = [];
  posts = [];
  message:String;
  messages = [];
  totalComments: any;
  listfriends = [];
  otherid:String;
  chatboard:Boolean= false;
  chatid = [];
  otherId:String;
  userid:String;
  senderid :String;
  commentPostId = String;
  CommentIndex = String;
  totalLikesofPost : any;
  AllLikes = [];
  defaultShowAreaOnPopup : any = 'comment'
  @ViewChild('myInput') myInputVariable: ElementRef;

 
 constructor(private globalService: GlobalService, private userService: UserService, private route: Router,private chatService: ChatService, private modalService: BsModalService,) {

  }


  ngOnInit() {
    this.user_id = localStorage.getItem('UserId');
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
        // this.total_friendreq = 5;
        this.total_friendreq = this.friendrequests.length;
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

 // Open Modal
 openModal(template: TemplateRef<any>, config) {
   if (config != 'empty')
   {
  this.modalRef = this.modalService.show(template,config);
   }
   else
   {
    this.modalRef = this.modalService.show(template);
   }
}

getFriendList()
{
  let data = { 'user_id': this.userId, 'token' : this.token };
    this.userService.friend_list(data).subscribe((response)  => {
      this.listfriends = response.data.friends;
    });
}

getFriendRequests()
{
  let uid = { 'id': this.userId, 'token' : this.token };
  this.userService.friendreq_alerts(uid).subscribe((response)  => {
    this.friendrequests = response.data;
      this.total_friendreq = this.friendrequests.length;
    console.log('Friend Requests =>', this.friendrequests);
  }); 
}

addStatus(template)
{
   this.openModal(template,'empty');
};

closeModal() {
  this.modalRef.hide();
}

displaySection(ref)
{
this.defaultShowAreaOnPopup = ref;
}

getAllStatus()
{
  let uid = { 'id': this.userId, 'token' : this.token };
  this.userService.get_status(uid).subscribe((response) => {
    this.Status = response.data;
   this.getallstatus = true;
   });
}

response_req(status,sender_id) {
  let data = {
    'sender_id': sender_id,
    'receiver_id': this.user_id,
    'status': status,
    'token': this.token
  };
  this.userService.response_of_friend(data).subscribe((response) => {
    console.log('Req response', response)
    if (status === 'accepted') {
      this.getFriendRequests();
      // this.friendrequest = response.data;
      // this.request_accepted = true;
    }
    if (status === 'rejected') {
      this.getFriendRequests();
      // this.friendrequest = {};
    }
  });
}

postComment(event, postId, index) {
  this.comments = event.target.value;
  let data = {
    'user_id': this.userId,
    'post_id': postId,
    'comment': this.comments,
    'token': this.token
  }
  this.userService.commentPost(data).subscribe((response) => {
    console.log("response from comment post api", response);
    this.allComment(postId, index);
    this.comments = event.target.value = '';
  })
}

public allComment(postId, indexs) {
  let data = {
    'user_id': this.userId,
    'post_id': postId,
    'token': this.token
  };
  this.allcomments = [];
  this.userService.getComment(data).subscribe((response) => {
    this.showcomment = true;
    this.showcomments = true;
    this.indexs = indexs;
    //console.log("get comment of all from all comments ==>",response.data);
    var len = response.data.length;
    this.totalComments = len;
    if(len > 0)
    {
    for (var comment = 0; comment < len; comment++) {
      this.allcomments[comment] = response.data[comment];
    }
  }
  else
  {
    this.allcomments = [];
  }
  })
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

  
  leftbar(event){
    event.preventDefault();
    $('.left-sidebar-menu').addClass('is-visible');
  }

  closerleftbar(event)
  {
    $('.left-sidebar-menu').removeClass('is-visible');
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
    var countlength = target.files.length;
    this.mediaSets(length,this.userId);
    for(var i=0; i<length; i++){
      let file = target.files[i];
      let data = { 'id' : this.userId,'mediaSetLength': countlength, 'upload_file' : file, 'token' : this.token};
    this.userService.upload_file(data).subscribe((response)  => {
        console.log('Current Profile => ', response );  
       
      });
  }

  window.alert("File is uploaded.");
  this.userService.sendMessage('sth');
  // this.reset();
  // location.reload();
  }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}

  mediaSets(length,Userid)
  {
    this.userService.MediaSet({'length':length,'token' : this.token, 'Userid': Userid }).subscribe((response)  => {
      console.log('Current Profile => ', response );  
    });
    
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
        this.getAllStatus(); 
      }
      if(response.success == false){
        this.getallstatus = true;
        this.status= response.data.status;
        this.userstatus = true;
        this.getAllStatus(); 
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
      this.getAllStatus();
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
      this.medias[i] = [];
      var extn = response.data[i].split(".").pop();
      if(extn == 'jpg' || extn == 'jpeg' || extn == 'gif' || extn == 'png'){
        this.medias[i]['post'] = response.data[i];
        this.medias[i]['type'] ='image';
        this.medias[i]['id'] = response.media_id[i];
       }
       if(extn == 'mov' || extn == 'mp4' || extn == 'webm' || extn == 'avi'){
         this.medias[i]['post'] = response.data[i];
         this.medias[i]['type'] = 'video';
         this.medias[i]['id'] = response.media_id[i];
       }
    }
    console.log(this.medias);
  });
}

  addComment(template, postId, indexs) {
    if (typeof this.modalRef != "undefined") {
      this.closeModal();
    }
    const config = {
      class: 'modal-comment',
    }
    this.defaultShowAreaOnPopup = 'comment';
    this.openModal(template,config);
    this.commentPostId = postId
    this.CommentIndex = indexs;
    this.allComment(postId, indexs);
    this.getTotalLikesOfPost(postId);
  };

  getTotalLikesOfPost(postId)
  {
    this.AllLikes = [];
    let uid = { 'post_id': postId, 'token': this.token };
    this.userService.GetLikesOfPost(uid).subscribe((response) => {
      this.totalLikesofPost = response.data.length
      this.AllLikes = response.data;
    })
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

removefriend(rec_id, event)
{
  let data = {
    'user_id' : this.userId,
    'suggestion_id' : rec_id,
    'token' : this.token
  };
  this.userService.remove_suggestion(data).subscribe((response) => {     
    console.log('send reponse', response);
    this.suggestfriend();      
  });
}
}
