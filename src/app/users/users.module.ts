import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserItemComponent} from "./components/user-item/user-item.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {UsersComponent} from "./users.component";
import {UserFormDialogComponent} from './components/user-form-dialog/user-form-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared/shared.module";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [
    UsersComponent,
    UserItemComponent,
    UserPageComponent,
    UserFormDialogComponent,
    UserProfileComponent,
  ],
  exports: [
    UserItemComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        RouterLinkWithHref
    ],
})
export class UsersModule {
}
