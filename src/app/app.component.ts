import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { UsersService } from './service/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bitcoins';
  token = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  createUser() {
    this.usersService.create({
      name: 'cristian',
      email: 'cvillazausuarioba@bamail.com',
      password: 'cvillazausuarioba'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }


}
