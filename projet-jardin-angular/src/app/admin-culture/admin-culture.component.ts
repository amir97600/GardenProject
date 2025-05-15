import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { Culture } from '../cultures/culture';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CultureService } from '../cultures/culture.service';
import { JardinService } from '../service/jardin.service';
import { PlanteService } from '../service/plante.service';
import { AdminCultureService } from '../service/admin-culture.service';

@Component({
  selector: 'admin-culture',
  standalone: false,
  templateUrl: './admin-culture.component.html',
  styleUrl: './admin-culture.component.css'
})
export class AdminCultureComponent {

      filteredCultures$!: Observable<Culture[]>;
      searchTerm: string = '';
      selectedFilter: string = '';
      private searchTermSubject = new BehaviorSubject<string>('');
      private selectedFilterSubject = new BehaviorSubject<string | null>(null);
      UserProperties = [
        "Id","Plantation","Arrosage","Quantite","Id_Jardin","Id_Plante","Type_Plante","Récolté?"
      ]
      public cultureFields = [
        { label: 'Date de Plantation', name: 'datePlantation', type: 'date' as const, required: true },
        { label: 'Date du dernier arrosage', name: 'dateDernierArrosage', type: 'date' as const, required: true },
        { label: 'quantite', name: 'quantite', type: 'number' as const, required: true },
        { label: 'Id du jardin', name: 'idJardin', type: 'select' as const, required: true },
        { label: 'Id de la plante', name: 'idPlante', type: 'select' as const, required: true },
        { label: 'Récolté ou non', name: 'recolte', type: 'radio' as const, required: true },
      ];  
      public cultureForm!: FormGroup;
      public culture:Culture = new Culture('','',0,0,0,'',false);
      public showModal: boolean = false;
      public messageError:string = '';
     
    
      constructor(private adminCultureService: AdminCultureService ,private cultureService: CultureService,private jardinService: JardinService,private planteService: PlanteService,private formBuilder: FormBuilder){}
      ngOnInit(): void {
    
          this.filteredCultures$ = combineLatest([
          this.cultureService.findAll(),
          this.searchTermSubject.pipe(startWith('')),
          this.selectedFilterSubject.pipe(startWith(null))
        ]).pipe(
          map(([cultures, search, filter]) => {
            if (!search) return cultures;
            if (!filter) {
              return cultures.filter(culture =>
                Object.values(culture).some(value =>
                  String(value ?? '').toLowerCase().includes(search.toLowerCase())
                )
              );
            }
            const key = this.getKeyFromProperty(filter);
            return cultures.filter((culture: any) =>
              String(culture[key] ?? '').toLowerCase().includes(search.toLowerCase())
            );
          })
        );
    
        
    
    
        this.cultureForm = this.formBuilder.group({
          datePlantation: ['', Validators.required],
          dateDernierArrosage: ['', Validators.required],
          quantite: ['',Validators.required],
          idJardin: [0,Validators.required],
          idPlante: [0,Validators.required],
          recolte: ['',Validators.required],
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
          'Date de Plantation': 'datePlantation',
          'Date du dernier arrosage': 'dateDernierArrosage',
          'quantite': 'quantite',
          'Id du jardin': 'idJardin',
          'Id de la plante': 'idPlante',
          'Récolté ou non' : 'recolte'
        };
        return map[label] || '';
      }
    
      delete(culture:any){
          this.cultureService.delete(culture.id).subscribe(() => {
            this.cultureService.refresh(); 
          });
      }
    
       public openModal(): void {
          this.showModal = true;
        }
    
      public editCulture(culture:any){
        this.culture = culture;
  
        this.cultureForm.patchValue({
          idJardin: this.culture.idJardin,
          idPlante: this.culture.idPlante,
          datePlantation: this.culture.datePlantation,
          dateDernierArrosage: this.culture.dateDernierArrosage,
          quantite: this.culture.quantite,
          recolte: this.culture.recolte,
        });
        
  
        this.openModal();
      }
    
     
        
      public closeModal(): void {
        this.cultureForm.reset();
        this.culture = new Culture('','', 0,0,0,'',false);
        this.showModal = false;
        this.messageError = '';
      }
        
      public onSignupSubmit(): void {
        if (this.cultureForm.valid) {
          this.adminCultureService.saveCulture(this.cultureForm, this.culture);
          this.closeModal();
        }
      }

}
