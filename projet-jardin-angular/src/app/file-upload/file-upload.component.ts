import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../service/file-upload.service'; 

@Component({
  selector: 'file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit{
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  private uploadedIcon:string = '';
  private uploadedImage:string = '';

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.progress = 0;
    this.message = '';
    this.currentFile = event.target.files.item(0);
  }

 upload(type: 'icone' | 'image'): void {
  if (this.currentFile) {
    this.uploadService.upload(this.currentFile).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          // Associer l'URL retournée à un champ spécifique
          if (type === 'icone') {
            this.uploadedIcon = event.body.fileName; // ou filePath selon ton API
          } else if (type === 'image') {
            this.uploadedImage = event.body.fileName;
          }
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Could not upload the file!';
        this.currentFile = undefined;
        this.progress = 0;
      },
      complete: () => {
        this.currentFile = undefined;
      }
    });
  }
}


}
