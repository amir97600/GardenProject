import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CultureService } from './culture.service';
import { ClientService } from '../service/client.service';
import { AuthService } from '../authentification/auth.service';
import { PlanteService } from '../service/plante.service';
import { JardinService } from '../service/jardin.service';
import { Plante } from '../model/plante';
import { Culture } from './culture';
import { MeteoService } from '../service/meteo.service';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.css'],
  standalone: false
})
export class CulturesComponent implements OnInit {

  cultureForm!: FormGroup;
  plantes: Plante[] = [];
  cultures: Culture[] = [];
  culturesAAroser: Culture[] = [];
  cultureSelectionnee?: Culture;
  showForm = false;
  idJardin!: number;
  today = new Date().toISOString().split('T')[0];
  popupMessage: string | null = null;
  joursRestantsAvantRecolte?: number;
  progressionRecolte?: number;

  constructor(
    private cultureService: CultureService,
    private formBuilder: FormBuilder,
    private meteoService: MeteoService,
    private clientService: ClientService,
    private planteService: PlanteService,
    private authService: AuthService,
    private jardinService: JardinService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.cultureForm = this.formBuilder.group({
      nomPlante: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      datePlantation: ['', Validators.required],
      dateDernierArrosage: ['', Validators.required],
      recolte: [false]
    });

    this.planteService.findAll().subscribe(plantes => {
      this.plantes = plantes;
      this.cultureForm.setValidators(this.formulaireCultureValidator());
    });

    const login = this.authService.getLoginFromToken();
    this.clientService.findByLogin(login).subscribe(client => {
      this.idJardin = client.idJardin;
      this.jardinService.findById(this.idJardin).subscribe(jardin => {
        this.cultures = jardin.cultures;

        this.meteoService.getPluie(jardin.lieu).subscribe(data => {
          if (data.reduce((sum, val) => sum + (val ?? 0), 0) > 0) {
            const todayStr = new Date().toISOString().split('T')[0];
            this.cultures.forEach(c => c.dateDernierArrosage = todayStr);
          }
        });
      });
    });
  }

  formulaireCultureValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const plantation = group.get('datePlantation')?.value;
      const arrosage = group.get('dateDernierArrosage')?.value;
      const nomPlante = group.get('nomPlante')?.value;
      const today = this.today;

      const errors: any = {};
      if (plantation > today) errors.datePlantationFuture = true;
      if (arrosage > today) errors.dateArrosageFuture = true;
      if (arrosage < plantation) errors.arrosageAvantPlantation = true;
      if (!this.plantes.map(p => p.nom).includes(nomPlante)) errors.planteInvalide = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

ajouterCulture(): void {
  if (this.cultureForm.invalid) {
    this.cultureForm.markAllAsTouched();
    return;
  }

  const formValue = this.cultureForm.value;
  const plante = this.plantes.find(p => p.nom === formValue.nomPlante);
  if (!plante) return;

  const nouvelleCulture = {
    datePlantation: formValue.datePlantation,
    dateDernierArrosage: formValue.dateDernierArrosage,
    quantite: formValue.quantite,
    recolte: formValue.recolte ?? false, // ici on force bien false
    idJardin: this.idJardin,
    idPlante: plante.id,
    planteType: plante.planteType
  };

  this.cultureService.save(nouvelleCulture).subscribe(() => {
    this.showForm = false;

    this.cultureForm.reset({
      nomPlante: '',
      quantite: 1,
      datePlantation: '',
      dateDernierArrosage: '',
      recolte: false // on remet la valeur explicitement
    });

    this.jardinService.findById(this.idJardin).subscribe(jardin => {
      this.cultures = jardin.cultures;
      this.afficherPopup("🌱 Culture plantée avec succès !");
    });
  });
}


  afficherFiche(culture: Culture): void {
    this.cultureSelectionnee = culture;
    this.planteService.findById(culture.idPlante).subscribe(plante => {
      const plantation = new Date(culture.datePlantation);
      const dateRecolte = new Date(plantation);
      dateRecolte.setDate(dateRecolte.getDate() + plante.delaiRecolte);

      const joursRestants = Math.ceil((dateRecolte.getTime() - Date.now()) / (1000 * 3600 * 24));
      this.joursRestantsAvantRecolte = Math.max(0, joursRestants);

      const progression = (plante.delaiRecolte - this.joursRestantsAvantRecolte) / plante.delaiRecolte * 100;
      this.progressionRecolte = Math.min(100, Math.max(0, Math.round(progression)));
    });
  }

  arroserCulture(culture: Culture): void {
    this.cultureService.arroser(culture.id).subscribe(() => {
      culture.dateDernierArrosage = this.today;
      this.afficherPopup("💧 Culture arrosée !");
      this.cultureSelectionnee = undefined;
    });
  }

  recolterCulture(culture: Culture): void {
    this.cultureService.recolter(culture.id).subscribe(() => {
      culture.recolte = true;
      this.afficherPopup("🧺 Récolte effectuée !");
      this.cultureSelectionnee = undefined;
    });
  }

  supprimerCulture(): void {
    if (!this.cultureSelectionnee) return;
    this.cultureService.delete(this.cultureSelectionnee.id).subscribe(() => {
      this.cultureSelectionnee = undefined;
      this.jardinService.findById(this.idJardin).subscribe(jardin => {
        this.cultures = jardin.cultures;
        this.afficherPopup("❌ Culture supprimée !");
      });
    });
  }

  AfficherIconeCulture(culture: Culture): string {
    const plante = this.plantes.find(p => p.id === culture.idPlante);
    return this.fileUploadService.getFileUploaded(plante?.icone || 'plante_default.png');
  }

  AfficherNomCulture(culture: Culture): string {
    return this.plantes.find(p => p.id === culture.idPlante)?.nom || 'Plante inconnue';
  }

  fermerFormAjout(): void {
    this.showForm = !this.showForm;
    this.cultureForm.reset({
      nomPlante: '',
      quantite: 1,
      datePlantation: '',
      dateDernierArrosage: '',
      recolte: false
    });
  }

  afficherPopup(message: string): void {
    this.popupMessage = message;
    setTimeout(() => this.popupMessage = null, 3000);
  }

  estAAroser(culture: Culture): boolean {
  const plante = this.plantes.find(p => p.id === culture.idPlante);
  if (!plante) return false;

  const dateDernierArrosage = new Date(culture.dateDernierArrosage);
  const prochaineDateArrosage = new Date(dateDernierArrosage);
  prochaineDateArrosage.setDate(prochaineDateArrosage.getDate() + plante.delaiArrosage);

  return new Date() >= prochaineDateArrosage && !culture.recolte;
}

}
