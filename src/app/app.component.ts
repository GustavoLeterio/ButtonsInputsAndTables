import { tableConfig } from './../Components/table/Interfaces/tableConfig';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Table {
  tableConfig: tableConfig;
  data: any;
}

interface formData {
  textInputOne: string | null;
  textInputTwo: string | null;
  searchInput: string | null;
  dateInput: string | null;
  fileInput: string | null;
  moneyInput: string | null;
  randomDocInput: string | null;
  dynamicNumberInput: string | null;
  multipleDynMaskInput: string | null;
  radioInput: any | null;
  checkboxInput: any | null;
  selectOne: any | null;
  selectTwo: any | null;
  textarea: string | null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formData: FormGroup =  new FormGroup({
    textInputOne: new FormControl(''),
    textInputTwo: new FormControl(''),
    searchInput: new FormControl(''),
    dateInput: new FormControl(''),
    fileInput: new FormControl(''),
    moneyInput: new FormControl(''),
    randomDocInput: new FormControl(''),
    dynamicNumberInput: new FormControl(''),
    multipleDynMaskInput: new FormControl(''),
    radioInput: new FormControl(''),
    checkboxInput: new FormControl(''),
    selectOne: new FormControl(''),
    selectTwo: new FormControl(''),
    textarea: new FormControl(''),
  });
  title = 'dinamic-table';
  buttonColors: string[] = [
    'light-blue',
    'dark-blue',
    'green',
    'dark-green',
    'yellow',
    'dark-yellow',
    'red',
    'dark-red',
    'wine',
    'white',
  ];
  buttonDropdownHandler(e: any) {
    console.log(e);
  }

  nonExpandableTable: Table = {
    tableConfig: {
      expand: false,
      setStatusColorOrder: ['yellow', 'red', 'green', 'grey'],
      inicialColumnPosToSort: 4, //0,1,2,3,4
      columns: [
        {
          //0
          name: 'Image',
          objName: 'image',
          type: 'image',
          sort: false,
          svg: '../assets/analista.svg',
        },
        {
          //1
          name: 'Text Type',
          objName: 'text',
          type: 'text',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //2
          name: 'Number Type',
          objName: 'number',
          type: 'number',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //3
          name: 'Link Type',
          objName: 'link',
          type: 'link',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //4
          name: 'Status',
          objName: 'status',
          type: 'status',
          sort: true,
          svg: '../assets/analista.svg',
        },
      ],
      actName: 'Actions',
      actions: [
        {
          title: 'Action Example!',
          actFunction: (e: Event, lineData: any) => {
            console.log('A function has been executed!', e, lineData);
          },
          svg: '../assets/analista.svg',
        },
      ],
    },
    data: [
      {
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'Active', color: 'green' },
      },
      {
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'Inactive', color: 'red' },
      },
      {
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'In Progress', color: 'yellow' },
      },
      {
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'Grey', color: 'grey' },
      },
    ],
  };

  expandableTable: Table = {
    tableConfig: {
      expand: true,
      setStatusColorOrder: ['yellow', 'red', 'green', 'grey'],
      inicialColumnPosToSort: 4, //0,1,2,3,4
      columns: [
        {
          //0
          name: 'Image',
          objName: 'image',
          type: 'image',
          sort: false,
          svg: '../assets/analista.svg',
        },
        {
          //1
          name: 'Text Type',
          objName: 'text',
          type: 'text',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //2
          name: 'Number Type',
          objName: 'number',
          type: 'number',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //3
          name: 'Link Type',
          objName: 'link',
          type: 'link',
          sort: true,
          svg: '../assets/analista.svg',
        },
        {
          //4
          name: 'Status',
          objName: 'status',
          type: 'status',
          sort: true,
          svg: '../assets/analista.svg',
        },
      ],
      actName: 'Actions',
      actions: [
        {
          title: 'Action Example!',
          actFunction: (e: Event, lineData: any) => {
            console.log('A function has been executed!', e, lineData);
          },
          svg: '../assets/analista.svg',
        },
      ],
    },
    data: [
      {
        openingDate: '2023-01-09',
        finalDate: '2023-04-11',
        stage: { href: '#', text: 'Interview Stage' },
        vacancyName: 'Java Developer',
        level: 'Junior',
        remuneration: 5250,
        enterprise: {
          name: 'SIS Consultoria',
          document: '000000000000000',
          contact: '(00)0 0000-0000 ',
        },
        responsables: [
          {
            name: 'Random Name',
            src: '../assets/thispersondoesnotexist.jpg',
            href: '#',
          },
          {
            name: 'Random Name',
            src: '../assets/thispersondoesnotexist.jpg',
            href: '#',
          },
        ],
        guarantee: 2,
        stages: [
          { id: 1, text: 'Placeholder', color: 'green' },
          { id: 2, text: 'Placeholder', color: 'red' },
          { id: 3, text: 'Placeholder', color: 'yellow' },
        ],
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'Active', color: 'green' },
      },
      {
        openingDate: '2023-01-09',
        finalDate: '2023-04-11',
        stage: { href: '#', text: 'Interview Stage' },
        vacancyName: 'Java Developer',
        level: 'Junior',
        remuneration: 5250,
        enterprise: {
          name: 'SIS Consultoria',
          document: '000000000000000',
          contact: '(00)0 0000-0000 ',
        },
        responsables: [
          {
            name: 'Random Name',
            src: '../assets/thispersondoesnotexist.jpg',
            href: '#',
          },
          {
            name: 'Random Name',
            src: '../assets/thispersondoesnotexist.jpg',
            href: '#',
          },
        ],
        guarantee: 2,
        stages: [
          { id: 1, text: 'Placeholder', color: 'green' },
          { id: 2, text: 'Placeholder', color: 'red' },
          { id: 3, text: 'Placeholder', color: 'yellow' },
        ],
        image: {
          alt: 'person',
          href: 'https://google.com',
          src: '../assets/thispersondoesnotexist.jpg',
        },
        number: 9999,
        link: { href: 'https://google.com', text: 'google`s link' },
        text: 'This is a text',
        status: { text: 'Status Yellow', color: 'yellow' },
      },
    ],
  };

  submit() {
    console.log(this.formData);
  }
}
