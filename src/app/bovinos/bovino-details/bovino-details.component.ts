import { Component, Input } from '@angular/core';
import { bovino } from '../bovino';
import { bovinoService } from '../bovino.service';

@Component({
  selector: 'bovino-details',
  templateUrl: './bovino-details.component.html',
  styleUrls: ['./bovino-details.component.css']
})

export class bovinoDetailsComponent {
  @Input()
  bovino: bovino;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private bovinoService: bovinoService) {}

  createbovino(bovino: bovino) {
    this.bovinoService.createbovino(bovino).then((newbovino: bovino) => {
      this.createHandler(newbovino);
    });
  }

  updatebovino(bovino: bovino): void {
    this.bovinoService.updatebovino(bovino).then((updatedbovino: bovino) => {
      this.updateHandler(updatedbovino);
    });
  }

  deletebovino(bovinoId: String): void {
    this.bovinoService.deletebovino(bovinoId).then((deletedbovinoId: String) => {
      this.deleteHandler(deletedbovinoId);
    });
  }
}