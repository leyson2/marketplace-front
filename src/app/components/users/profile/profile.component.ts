import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = [];
  token: any;
  username: string = '';
  t: any;
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.t = localStorage.getItem('token');
    this.token = jwt_decode(this.t);
    this.username = this.token.Usuario;

    this._userService.profile(this.username).subscribe((res) =>{
      this.profile = res;
      console.log(this.profile);
    })
  }
}
