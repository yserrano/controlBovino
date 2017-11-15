import { Component, OnInit } from '@angular/core';
import { bovino } from '../bovino';
import { bovinoService } from '../bovino.service';
import { bovinoDetailsComponent } from '../bovino-details/bovino-details.component';

@Component({
  selector: 'bovino-list',
  templateUrl: './bovino-list.component.html',
  styleUrls: ['./bovino-list.component.css'],
  providers: [bovinoService]
})

export class bovinoListComponent implements OnInit {

  bovinos: bovino[]
  selectedbovino: bovino

  constructor(private bovinoService: bovinoService) { }

  ngOnInit() {
     this.bovinoService
      .getbovinos()
      .then((bovinos: bovino[]) => {
        this.bovinos = bovinos.map((bovino) => {
          if (!bovino.enfermedad) {
            bovino.enfermedad = {
              edadEnfermedad: '',
              pesoEnfermedad: ''
            }
          }
          return bovino;
        });
      });
  }

  private getIndexOfbovino = (bovinoId: String) => {
    return this.bovinos.findIndex((bovino) => {
      return bovino._id === bovinoId;
    });
  }

  selectbovino(bovino: bovino) {
    this.selectedbovino = bovino
  }

  createNewbovino() {
    var bovino: bovino = {
	  identificador: '',
	  edad: '',
	  peso: '',
	  enfermedad: {
		edadEnfermedad: '',
		pesoEnfermedad: '',
	  },
	  tratamiento: {
		vacuna: '',
		fechaVacuna: '',
	  }
    };

    // By default, a newly-created bovino will have the selected state.
    this.selectbovino(bovino);
  }

  deletebovino = (bovinoId: String) => {
    var idx = this.getIndexOfbovino(bovinoId);
    if (idx !== -1) {
      this.bovinos.splice(idx, 1);
      this.selectbovino(null);
    }
    return this.bovinos;
  }

  addbovino = (bovino: bovino) => {
    this.bovinos.push(bovino);
    this.selectbovino(bovino);
    return this.bovinos;
  }

  updatebovino = (bovino: bovino) => {
    var idx = this.getIndexOfbovino(bovino._id);
    if (idx !== -1) {
      this.bovinos[idx] = bovino;
      this.selectbovino(bovino);
    }
    return this.bovinos;
  }
}