import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { Culture } from '../cultures/culture';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CultureService } from '../cultures/culture.service';
import { JardinService } from '../service/jardin.service';
import { PlanteService } from '../service/plante.service';

@Component({
  selector: 'admin-culture',
  standalone: false,
  templateUrl: './admin-culture.component.html',
  styleUrl: './admin-culture.component.css'
})
export class AdminCultureComponent {

      filteredCultures$!: Observable<Culture[]>;
      searchTerm: string = '';
      selectedFilter: string | null = null;
      private searchTermSubject = new BehaviorSubject<string>('');
      private selectedFilterSubject = new BehaviorSubject<string | null>(null);
      UserProperties = [
        "Id","Date de Plantation","Date du dernier arrosage","quantite","recolte","Id du jardin","Id de la plante","Type de la plante","Récolté ou non"
      ]
      public cultureForm!: FormGroup;
      public culture:Culture = new Culture('','',0,0,0,'',false);
      public showModal: boolean = false;
      public messageError:string = '';
     
    
      constructor(private adminCultureService: AdminCultureService ,private cultureService: CultureService,private jardinService: JardinService,private planteService: PlanteService,private formBuilder: FormBuilder){}
      ngOnInit(): void {
    
        this.filteredCultures$ = combineLatest([
          this.jardinService.findAll(),
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
          libelle: ['', Validators.required],
          superficie: [0, Validators.required],
          lieu: ['',Validators.required],
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
          this.selectedFilter = null;
        } else {
          // Sinon, on sélectionne ce filtre
          this.selectedFilter = property;
        }
      }
    
      getKeyFromProperty(label: string): string {
        const map: { [key: string]: string } = {
          'Id': 'numero',
          'Libelle': 'nom',
          'Superficie': 'superficie',
          'Lieu': 'lieu',
        };
        return map[label] || '';
      }
    
      delete(jardin:any){
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
          this.jardinService.delete(jardin).subscribe(() => {
            this.jardinService.refresh(); 
          });
        }
      }
    
       public openModal(): void {
          this.showModal = true;
        }
    
      public editCulture(jardin:any){
        this.jardin = jardin;
  
        this.jardinForm.patchValue({
          libelle: this.jardin.nom,
          lieu: this.jardin.lieu,
          superficie: this.jardin.superficie,
          })
  
        this.openModal();
      }
    
     
        
      public closeModal(): void {
        this.jardinForm.reset();
        this.jardin = new Culture('', 0, '');
        this.showModal = false;
        this.messageError = '';
      }
        
      public onSignupSubmit(): void {
        if (this.jardinForm.valid) {
          this.adminCultureService.saveCulture(this.jardinForm, this.jardin);
          this.closeModal();
        }
      }

}
