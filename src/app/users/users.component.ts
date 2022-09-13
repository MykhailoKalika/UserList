import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/users";
import {MatDialog} from "@angular/material/dialog";
import {UserFormDialogComponent} from "./components/user-form-dialog/user-form-dialog.component";
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users?: User[];

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService
  ) {

  }

  ngOnInit() {
    this.usersService.users$.subscribe(users => this.users = users)
    this.usersService.getUsers();
  }

  addUser() {
    this.dialog.open(UserFormDialogComponent, {
      width: '800px',
      data: {
        header: 'Add User'
      }
    });
  }
}
