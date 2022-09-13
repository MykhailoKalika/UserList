import {Component, Input} from '@angular/core';
import {User} from "../../../shared/models/users";
import {UsersService} from "../../services/users.service";
import {UserFormDialogComponent} from "../user-form-dialog/user-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
  ) {
  }

  @Input() public user!: User

  public removeUser(): void {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Are you sure?'
      }
    });
    confirmDialog.afterClosed().subscribe(res => res ? this.usersService.removeUser(this.user.id) : null);
  }

  public editUser(): void {
    this.dialog.open(UserFormDialogComponent, {
      width: '800px',
      data: {
        header: 'Edit User',
        user: this.user
      }
    });
  }
}
