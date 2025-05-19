import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { Plante } from '../model/plante';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePlante } from '../model/type-plante';
import { AdminPlanteService } from '../service/admin-plante.service';
import { PlanteService } from '../service/plante.service';

@Component({
  selector: 'app-admin-plante',
  standalone: false,
  templateUrl: './admin-plante.component.html',
  styleUrl: './admin-plante.component.css'
})
export class AdminPlanteComponent {

  filteredPlantes$!: Observable<Plante[]>;
      searchTerm: string = '';
      selectedFilter: string = '';
      private searchTermSubject = new BehaviorSubject<string>('');
      private selectedFilterSubject = new BehaviorSubject<string | null>(null);
      UserProperties = [
        "Id","Nom","Délai d'arrosage","Délai de récolte","Description","Conseil","Durée de vie","Type"
      ]
      public planteFields = [
        { label: 'Nom', name: 'nom', type: 'text' as const, required: true },
        { label: "Délai d'arrosage", name: 'delaiArrosage', type: 'number' as const, required: true },
        { label: 'Délai de récolte', name: 'delaiRecolte', type: 'number' as const, required: true },
        { label: 'Description', name: 'description', type: 'textarea' as const, required: true },
        { label: 'Conseil', name: 'conseil', type: 'textarea' as const, required: true },
        { label: 'DureeVie', name: 'dureeVie', type: 'number' as const, required: true },
        { label: 'Comestibilité', name: 'comestibilite', type: 'radio' as const, required: true},
        { label: 'Type de Plante', name: 'planteType', type: 'select' as const, required: true },
        { label: 'Image', name: 'image', type: 'file' as const, required: true },
        { label: 'Icone', name: 'icone', type: 'file' as const, required: true }

      ];  
       
      public planteForm!: FormGroup;
      public plante:Plante = new Plante(TypePlante.Fleur,0,0,0,'','',0,'',false,'','');
      public showModal: boolean = false;
      public messageError:string = '';
     
    
      constructor(private adminPlanteService: AdminPlanteService ,private planteService: PlanteService,private formBuilder: FormBuilder){}
      ngOnInit(): void {
    
          this.filteredPlantes$ = combineLatest([
          this.planteService.findAll(),
          this.searchTermSubject.pipe(startWith('')),
          this.selectedFilterSubject.pipe(startWith(null))
        ]).pipe(
          map(([plantes, search, filter]) => {
            if (!search) return plantes;
            if (!filter) {
              return plantes.filter(plante =>
                Object.values(plante).some(value =>
                  String(value ?? '').toLowerCase().includes(search.toLowerCase())
                )
              );
            }
            const key = this.getKeyFromProperty(filter);
            return plantes.filter((plante: any) =>
              String(plante[key] ?? '').toLowerCase().includes(search.toLowerCase())
            );
          })
        );
    
        
    
        this.doForm();
        
    
      }

      doForm(){
        this.planteForm = this.formBuilder.group({
          nom: ['',Validators.required],
          delaiArrosage: [0, Validators.required],
          delaiRecolte: [0, Validators.required],
          description: ['',Validators.required],
          conseil: ['',Validators.required],
          dureeVie: [0,Validators.required],
          planteType: [TypePlante.Fleur,Validators.required],
          comestibilite: [false,Validators.required],
          image: ['',Validators.required],
          icone: ['',Validators.required],
        });
      }
    
      onSearch(term: string): void {
        this.searchTerm = term;
        this.searchTermSubject.next(term);
        this.selectedFilterSubject.next(this.selectedFilter);
      }
    
      selectFilter(property: string): void {
        // Si le filtre est déjà sélectionné, on le désélectionne
        if (this.selectedFilter === property) {
          this.selectedFilter = '';
        } else {
          // Sinon, on sélectionne ce filtre
          this.selectedFilter = property;
        }
      }
    
      getKeyFromProperty(label: string): string {
        const map: { [key: string]: string } = {
          'Id': 'id',
          'Nom': 'nom',
          "Délai d'arrosage": 'delaiArrosage',
          'Délai de récolte': 'delaiRecolte',
          'Description': 'description',
          'Conseil': 'conseil',
          'Durée de vie': 'dureeVie',
          'Type' : 'planteType',
          'Comestibilité' : 'comestibilite'
        };
        return map[label] || '';
      }

    
      delete(plante:Plante){
          this.planteService.delete(plante).subscribe(() => {
            this.planteService.refresh(); 
          });
      }
    
       public openModal(): void {
          this.showModal = true;
        }
    
      public editPlante(plante:Plante){
        
        this.planteForm.patchValue({
          delaiArrosage: plante.delaiArrosage,
          delaiRecolte: plante.delaiRecolte,
          description: plante.description,
          conseil: plante.conseil,
          dureeVie: plante.dureeVie,
          nom: plante.nom,
          planteType: plante.planteType,
          comestibilite: plante.comestibilite ? true : false,
          image: plante.image,
          icone: plante.icone
        });

        this.plante=plante;
        
  
        this.openModal();
      }
        
      public closeModal(): void {
        this.planteForm.reset();
        this.doForm();
        this.plante = new Plante(TypePlante.Fleur,0,0,0,'','',0,'',false,'','');
        this.showModal = false;
        this.messageError = '';
      }
        
      public onSignupSubmit(): void {
        if (this.planteForm.valid) {
          this.adminPlanteService.savePlante(this.planteForm, this.plante);
          this.closeModal();
        }
      }
      

}
