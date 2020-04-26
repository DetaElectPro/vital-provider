import {Component, OnInit} from '@angular/core';
import {FileLikeObject, FileUploader} from 'ng2-file-upload';
import {concat} from 'rxjs';
import {AuthService} from '../../../Service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-image-update',
  templateUrl: './image-update.page.html',
  styleUrls: ['./image-update.page.scss'],
})
export class ImageUpdatePage implements OnInit {
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  requestDataForm: FormGroup;
  requestData: any = {name: null, image: null};

  constructor(
      private uploadingService: AuthService) {
    this.requestDataForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(1)]),
      image: new FormControl('', [Validators.required, Validators.minLength(1)])

    });
  }

  ngOnInit() {
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
      formData.append('image', file.rawFile, file.name);
      formData.append('name', 'omer')
      requests.push(this.uploadingService.uploadFormData(formData));

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
