import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDialogBoxComponent } from '../dialog-box/dialog-box.component';
import { User } from '../../admin/users/user.model';
import { UsersService } from '../../admin/users/users.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { UsernameCommService } from '../../login/username.comm.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  username: string;
  userRole: string;
  user: User = new User();
  photoUrl: string;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private fb: FormBuilder,
    private communicationService: UsernameCommService,
    private readonly notificationService: NotificationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
    });

    this.username = this.tokenService.username;
    this.userRole = this.tokenService.role;
    this.getUser(this.username);
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  getUser(username: string) {
    this.usersService
      .getUser(username)
      .subscribe({
        next: (v) => {
          this.user = v,
          this.initForm(v),
          this.getUserPhoto(v.username)
        },
        error: (e) => console.log(e)
      });
  }

  initForm(user: User) {
    // object to be submitted
    this.user = user;

    // formbuilder field values
    this.userForm.controls.first_name.setValue(user.first_name);
    this.userForm.controls.last_name.setValue(user.last_name);
  }

  getUserPhoto(username: string) {
    this.usersService
      .getUserPhoto(username)
      .subscribe({
        next: (v) => {
          this.photoUrl = 'data:image/gif;base64,' + v,
          this.communicationService.emitChange({
            username: username,
            role: this.userRole,
            profilePhoto: this.photoUrl
          });
        },
        error: (e) => console.log(e)
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PhotoDialogBoxComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUserPhoto(this.user.username);
    });
  }

  updateFirstName(event: any) {
    this.user.first_name = event.target.value;
  }

  updateLastName(event: any) {
    this.user.last_name = event.target.value;
  }

  saveUser() {
    if (this.user) {
      this.user.updated_by = this.user.username;
    }

    if (this.userForm.valid && this.user) {
      this.usersService
        .updateUser(this.user)
        .subscribe({
          next: () => this.notificationService.success('Save Successful'),
          error: (e) => console.log(e)
        });
    }
  }
}