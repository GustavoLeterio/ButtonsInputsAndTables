import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.css'],
})
export class InfoBlockComponent implements OnInit {
  @Input() blockType: string = '';
  @Input() blockData: any;

  config: any = {};

  positivateNumber(number: number) {
    return Math.abs(number);
  }

  setBlockConfig(): void {
    if (this.blockType == 'vacancyInfo') {
      this.config = {
        title: 'Info',
        path: '#',
        separator: ': ',
        type: 'text',
        items: [
          { name: 'Vacancy', data: this.blockData.vacancyName },
          { name: 'Technical Level', data: this.blockData.level },
          {
            name: 'Remuneration',
            data: 'R$ ' + this.blockData.remuneration,
          },
        ],
      };
      return;
    }
    if (this.blockType == 'lastAtt') {
      this.config = {
        title: 'Last Updates',
        path: '#',
        hoursRemaining: 0,
        progress: 0,
        type: 'text',
        items: [
          {
            name:
              'Last Stage ( ' +
              this.blockData.stage.text +
              ' ) - ' +
              (moment(this.blockData.finalDate)).format('DD/MM/YYYY')
          },
        ],
      };
      return;
    }
    if (this.blockType == 'enterpriseInfo') {
      this.config = {
        title: 'Enterprise',
        path: '#',
        separator: ': ',
        type: 'text',
        items: [
          {
            name: 'Name',
            data: this.blockData.enterprise.name,
          },
          {
            name: 'Document',
            data: this.blockData.enterprise.document,
          },
          {
            name: 'Main Contact',
            data: this.blockData.enterprise.contact,
          },
        ],
      };
      return;
    }
    if (this.blockType == 'vacancyResponsables') {
      this.config = {
        title: 'Managers',
        type: 'image',
        items: this.blockData.responsables,
      };
      return;
    }
    if (this.blockType == 'guarantee') {
      this.config = {
        title: 'guarantee',
        type: 'text',
        items: [
          {
            data: `Offered a guarantee of ${this.blockData.guarantee} month(s).`,
          },
        ],
      };
      return;
    }
    if (this.blockType == 'quickActions') {
      this.config = {
        title: 'Quick Actions',
        type: 'link',
        items: [
          {
            text: 'Detail vacancy',
            href: `#`,
          },
          {
            text: 'Candidates list',
            href: `#`,
          },
          {
            text: 'Define and edit new stages',
            href: `#`,
          },
        ],
      };
      return;
    }
  }

  setHoursRemaining(): void {
    const finalDate = new Date(this.blockData.finalDate);
    finalDate.setHours(finalDate.getHours() + 21);
    const date = new Date();
    this.config.hoursRemaining = Math.round(
      (finalDate.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
  }

  setProgress(): void {
    const today = new Date();
    today.setHours(today.getHours() + 11);
    const finalDate = new Date(this.blockData.finalDate);
    finalDate.setHours(finalDate.getHours() + 21);
    const entireTime = Math.round(
      (finalDate.getTime() - today.getTime()) / (1000 * 60 * 60)
    );
    this.config.progress = Math.round(
      100 - (this.config.hoursRemaining * 100) / entireTime
    );
  }

  constructor() {}

  ngOnInit(): void {
    this.setBlockConfig();
    if (this.blockType == 'lastAtt') {
      this.setHoursRemaining();
      this.setProgress();
    }
  }
}
