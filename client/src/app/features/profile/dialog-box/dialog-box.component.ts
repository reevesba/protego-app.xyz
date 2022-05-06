import { Component, Inject, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from '../../../features/admin/users/users.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: 'dialog-box.component.html',
  styleUrls: ['dialog-box.component.css']
})
export class PhotoDialogBoxComponent implements OnInit {
  EXT_LIST: Array<string> = ['.jpg', '.png', '.gif'];
  error: string;

  username: string;
  uploader: FileUploader;
  hasDragOver: boolean = false;
  processing: boolean = false;
  file: any;

  @Input()
  editmode: boolean = true;

  @Input()
  url: string;

  @Output()
  urlChange = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogBoxComponent>,
    public sanitizer: DomSanitizer,
    private usersService: UsersService,
    private readonly notificationService: NotificationService,
    private tokenService: TokenService,

    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.uploader = new FileUploader({ url: '' });

        this.uploader.onAfterAddingFile = (fileItem) => {
          if (this.validateFile(fileItem._file)) {
            // set url in UI
            let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
            this.url = url;

            // data to be posted is it because const?
            const formData: FormData = new FormData();
            formData.append('file', fileItem._file, fileItem._file.name);
            this.file = formData;
          }
        };
    }

  ngOnInit() {
    this.username = this.tokenService.username;
    this.getUserPhoto(this.username);
  }

  getUserPhoto(username: string) {
    this.usersService
      .getUserPhoto(username)
      .subscribe({
        next: (v) => this.url = 'data:image/gif;base64,' + v,
        error: (e) => console.log(e)
      });
  }

  doAction() {
    this.saveUserPhoto();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveUserPhoto() {
    this.usersService
      .updateUserPhoto(this.username, this.file)
      .subscribe({
        next: () => this.notificationService.success('Photo Updated'),
        error: (e) => console.log(e)
      });
  }

  fileOver(event: any): void {
    this.hasDragOver = event;
  }

  validateFile(file: any) {
    const filename: string = file.name;
    const size: number = file.size;
    const ext: string = filename.substring(filename.lastIndexOf('.'));
    let valid: boolean = true;
    this.error = '';

    // validate extension
    if (this.EXT_LIST.indexOf(ext) < 0) {
      valid = false;
      this.error = 'protego.dialog-box.warn1';
    } 

    // validate size
    if (size > 1024*500) {
      valid = false;
      this.error = 'protego.dialog-box.warn2';
    }
    return valid;
  }
}