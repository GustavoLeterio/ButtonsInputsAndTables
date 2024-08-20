import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css'],
})
export class StageListComponent implements OnInit {
  @Input() vacancyId: any[] = [];
  @Input() stages: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.stages.sort((a: any, b: any) => b.id - a.id);
  }
}
