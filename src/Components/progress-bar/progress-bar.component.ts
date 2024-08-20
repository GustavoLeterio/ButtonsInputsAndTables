import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() color: String = '';
  @Input() text: String = '';

  constructor() {}
  ngOnInit(): void {}
}
