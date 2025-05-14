import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VilleService } from '../../service/ville.service';
import { JardinService } from '../../service/jardin.service';
import { PlanteService } from '../../service/plante.service';
import { Plante } from '../../model/plante';
import { TypePlante } from '../../model/type-plante';

@Component({
  selector: 'modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})


export class ModalFormComponent implements OnInit, OnChanges {
  
  @Input() title: string = '';
  @Input() form!: FormGroup;
  @Input() fields: Array<{
    label: string;
    name: string;
    type?: 'text' | 'password' | 'select' | 'codePostal'| 'number' | 'radio' | 'date' |'textarea';
    required: boolean;
    options?: string[] ;
  }> = [];

  radioOptions = [
    { label: 'Oui', value: true },
    { label: 'Non', value: false }
  ];

  @Input() show: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  private plantes!:Plante[];

  constructor(private villeService: VilleService,private jardinService : JardinService,private planteService : PlanteService) {}

  ngOnInit(): void {
    this.getIdJardin(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.show) {
      this.getIdJardin();
    }
  }

  onCodePostalChange() {
    const codePostal = this.form.get('codePostal')?.value;
    if (codePostal && codePostal.trim().length >= 4) {
      this.villeService.getVilleByCodePostal(codePostal).subscribe({
        next: (villes: string[]) => {
          const villeField = this.fields.find(f => f.name === 'lieu');
          if (villeField) {
            villeField.options = villes;
            const currentValue = this.form.get('lieu')?.value;

            if (!currentValue && villes.length > 0) {
              this.form.get('lieu')?.setValue(villes[0]);
            }
          }
        },
        error: () => {
          const villeField = this.fields.find(f => f.name === 'lieu');
          if (villeField) {
            villeField.options = [];
          }
        }
      });
    }
  }

  getIdJardin() {
    const title = this.title;
    if (title.toLowerCase().includes('culture')) {
      this.jardinService.findAll().subscribe({
        next: (jardins) => {
          const jardinsID = jardins.map(jardin => jardin.numero.toString()); // <-- extraction des ID
  
          const jardinField = this.fields.find(f => f.name === 'idJardin');
          if (jardinField) {
            jardinField.options = jardinsID;
            const currentValue = this.form.get('idJardin')?.value;
            if (!currentValue && jardinsID.length > 0) {
              this.form.get('idJardin')?.setValue(jardinsID[0]);
            }
          }
          
        },
        error: () => {
          const jardinField = this.fields.find(f => f.name === 'idJardin');
          if (jardinField) {
            jardinField.options = [];
          }
        }
      });

      this.planteService.findAll().subscribe({
        next: (plantes) => {
          this.plantes = plantes; // <-- garde-les pour référence plus tard
        
          const planteField = this.fields.find(p => p.name === 'idPlante');
          if (planteField) {
            planteField.options = plantes.map(p => p.id.toString()); // ou p.id.toString() si tes champs sont des strings
            const currentValue = this.form.get('idPlante')?.value;
            if (!currentValue && planteField.options.length > 0) {
              this.form.get('idPlante')?.setValue(planteField.options[0]);
            }
          }
        },
        error: () => {
          const planteField = this.fields.find(f => f.name === 'idPlante');
          if (planteField) {
            planteField.options = [];
          }
        }
      });

    }

    if (title.toLowerCase().includes('plante')) {
      const TypeField = this.fields.find(f => f.name === 'planteType');
      if (TypeField) {
        TypeField.options = Object.values(TypePlante);
        const currentValue = this.form.get('planteType')?.value;
        if (!currentValue && TypeField.options.length > 0) {
          this.form.get('planteType')?.setValue(TypeField.options[0]);
        }
        
      }
    }
  }

  
  onIdPlanteChange() {
    const selectedId = this.form.get('idPlante')?.value;
  
    const selectedPlante = this.plantes.find(p => p.id === +selectedId);
    if (selectedPlante) {
      this.form.get('typePlante')?.setValue(selectedPlante.planteType); // <-- remplissage automatique
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}

