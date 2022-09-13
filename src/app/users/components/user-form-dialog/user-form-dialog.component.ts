import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../../../shared/models/users";
import {UsersService} from "../../services/users.service";
import {DialogRef} from "@angular/cdk/dialog";

export class UserFormProps {
  header!: string;
  user?: User;
}

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: UserFormProps,
    private dialogRef: DialogRef,
  ) {
  }

  public ngOnInit() {
    this.handleErrors();
    if (!this.data.user) {
      return;
    }
    this.userForm.controls['name'].patchValue(this.data.user.name);
    this.userForm.controls['email'].patchValue(this.data.user.email);
    this.userForm.controls['phone'].patchValue(this.data.user.phone);
  }

  public userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required]
  });

  public submit(): void {
    this.removeErrors();
    if (this.usersService.emailError$.getValue() && this.usersService.emailError$.getValue()) {
      return;
    }
    if (this.data.user) {
      if (this.usersService.editUser({...this.userForm.getRawValue(), id: this.data.user.id})) {
        this.dialogRef.close();
      }
      return;
    } else if (this.usersService.addUser(this.userForm.getRawValue())) {
      this.dialogRef.close();
    }
  }

  private removeErrors(): void {
    this.usersService.emailError$.next('');
    this.usersService.phoneError$.next('');
  }

  private handleErrors(): void {
    this.usersService.emailError$.subscribe(err => {
      if (err) {
        this.userForm.controls['email'].setErrors({[err]: true})
      }
    })

    this.usersService.phoneError$.subscribe(err => {
      if (err) {
        this.userForm.controls['phone'].setErrors({[err]: true})
      }
    })
  }
}
