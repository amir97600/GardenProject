import { Component, Input } from '@angular/core';
import { Plante } from '../model/plante';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'plant-card',
  standalone: false,
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.css'
})
export class PlantCardComponent {

  constructor(private fileService: FileUploadService){}

  @Input() plante!: Plante;

  isModalOpen = false;

  public ouvrirModal(): void {
    //console.log("Ouverture de la modale...");
    this.isModalOpen = true;
  }

  public fermerModal(): void {
    //console.log("Fermeture de la modale...");
    this.isModalOpen = false;
  }

  public getImagePath(nom : string | undefined){
    return this.fileService.getFileUploaded(nom);
  }

}
