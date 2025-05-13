import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { Jardin } from '../model/jardin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JardinService } from '../service/jardin.service';
import { AdminJardinService } from '../service/admin-jardin.service';

@Component({
  selector: 'admin-jardin',
  standalone: false,
  templateUrl: './admin-jardin.component.html',
  styleUrl: './admin-jardin.component.css'
})
export class AdminJardinComponent {
    filteredJardins$!: Observable<Jardin[]>;
    searchTerm: string = '';
    selectedFilter: string | null = null;
    private searchTermSubject = new BehaviorSubject<string>('');
    private selectedFilterSubject = new BehaviorSubject<string | null>(null);
    UserProperties = [
      "Id","Libelle","Lieu","Superficie"
    ]
    public jardinForm!: FormGroup;
    public jardin:Jardin = new Jardin('',0,'');
    public showModal: boolean = false;
    public messageError:string = '';
   
  
    constructor(private adminJardinService: AdminJardinService ,private jardinService: JardinService,private formBuilder: FormBuilder){}
    ngOnInit(): void {
  
      this.filteredJardins$ = combineLatest([
        this.jardinService.findAll(),
        this.searchTermSubject.pipe(startWith('')),
        this.selectedFilterSubject.pipe(startWith(null))
      ]).pipe(
        map(([jardins, search, filter]) => {
          if (!search) return jardins;
          if (!filter) {
            return jardins.filter(jardin =>
              Object.values(jardin).some(value =>
                String(value ?? '').toLowerCase().includes(search.toLowerCase())
              )
            );
          }
          const key = this.getKeyFromProperty(filter);
          return jardins.filter((jardin: any) =>
            String(jardin[key] ?? '').toLowerCase().includes(search.toLowerCase())
          );
        })
      );
  
      
  
  
      this.jardinForm = this.formBuilder.group({
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
      if (confirm('Êtes-vous sûr de vouloir supprimer ce jardin ?')) {
        this.jardinService.delete(jardin).subscribe(() => {
          this.jardinService.refresh(); 
        });
      }
    }
  
     public openModal(): void {
        this.showModal = true;
      }
  
    public editJardin(jardin:any){
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
      this.jardin = new Jardin('', 0, '');
      this.showModal = false;
      this.messageError = '';
    }
      
    public onSignupSubmit(): void {
      if (this.jardinForm.valid) {
        this.adminJardinService.saveJardin(this.jardinForm, this.jardin);
        this.closeModal();
      }
    }

    public jardinFields = [
      { label: 'Libellé', name: 'libelle', type: 'text', required: true },
      { label: 'Ville', name: 'lieu', type: 'text', required: true },
      { label: 'Superficie', name: 'superficie', type: 'text', required: true }
    ];  
  
  }
  


