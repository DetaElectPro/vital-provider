import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {FileLikeObject, FileUploader} from 'ng2-file-upload';
import {concat} from 'rxjs';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-cv-update',
  templateUrl: './cv-update.page.html',
  styleUrls: ['./cv-update.page.scss'],
})
export class CvUpdatePage implements OnInit {
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  userInfo: any;

  constructor(
      private uploadingService: AuthService,
      private storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('userInfo').then(data => {
      this.userInfo = data;
      console.log(this.userInfo);
    }).catch(error => {
      console.log(error);
    });
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }

  uploadFiles() {

    const files = this.getFiles();
    const requests = [];

    files.forEach((file) => {
      const formData = new FormData();
      formData.append('cv', file.rawFile, file.name);
      requests.push(this.uploadingService.uploadCvFile(formData));

    });

    concat(...requests).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
    );
  }
}
