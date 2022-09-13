import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../shared/models/users";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user?: User | null;

  constructor(
    route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.user = this.usersService.getUser(Number(route.snapshot.params['id']));
  }

}
