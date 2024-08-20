import { tableConfig } from './Interfaces/tableConfig';
import {
  Component,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() config: tableConfig = {
    inicialColumnPosToSort: 0,
    expand: false,
    columns: [],
  };

  @Input() data: any = [];

  actionTrigger: boolean = false;

  tableLines: any[] = [];
  expandLabelSize: string = '';

  sortOrder: boolean[] = []; //Criado um trigger para cada coluna, para poder controlar sua ordenação

  expandHandler: boolean[] = []; //Criado um trigger para cada coluna, para poder controlar sua expansão

  pagePos: number = 0;
  @Output() pagePosEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input() pageLength: number = 0;

  //Formata a string de data em inglês para string em português
  formatDate(date: string): string {
    var strArr: string[] = date.split('-');
    return strArr[2] + '/' + strArr[1] + '/' + strArr[0];
  }

  resetOrder(arrPos: number): void {
    //Reseta a Ordem
    this.sortOrder.forEach((order, i) => {
      if (this.sortOrder[arrPos] != order) this.sortOrder[i] = false;
    });
  }

  //Organiza a lista por coluna, respeitando o tipo da mesma
  sortList(type: string, columnPos: number, changeOrder: boolean = true): void {
    this.resetOrder(columnPos);

    if (changeOrder) this.sortOrder[columnPos] = !this.sortOrder[columnPos]; //True -> Crescente, False -> Descendente

    const sortOrder: boolean = this.sortOrder[columnPos];

    if (type == 'number') {
      this.tableLines.sort((a: any, b: any) => {
        return sortOrder
          ? a.refinedLine[columnPos] - b.refinedLine[columnPos]
          : b.refinedLine[columnPos] - a.refinedLine[columnPos];
      });
      return;
    }

    if (type == 'text') {
      this.tableLines.sort((a: any, b: any) => {
        if (a.refinedLine[columnPos] < b.refinedLine[columnPos])
          return sortOrder ? -1 : 1;
        if (a.refinedLine[columnPos] > b.refinedLine[columnPos])
          return sortOrder ? 1 : -1;
        return 0;
      });
      return;
    }

    if (type == 'link') {
      this.tableLines.sort((a: any, b: any) => {
        if (a.refinedLine[columnPos].text < b.refinedLine[columnPos].text)
          return sortOrder ? -1 : 1;
        if (a.refinedLine[columnPos].text > b.refinedLine[columnPos].text)
          return sortOrder ? 1 : -1;
        return 0;
      });
      return;
    }

    if (type == 'date') {
      this.tableLines.sort((a: any, b: any) => {
        return sortOrder
          ? new Date(b.refinedLine[columnPos]).getTime() -
              new Date(a.refinedLine[columnPos]).getTime()
          : new Date(a.refinedLine[columnPos]).getTime() -
              new Date(b.refinedLine[columnPos]).getTime();
      });
      return;
    }

    if (type == 'status') {
      let arr: any = [];

      function pushToArr(tableLines: any, filter: string) {
        arr.push(
          tableLines
            .filter((item: any) => {
              return item.refinedLine[columnPos].color == filter ? item : null;
            })
            .sort((a: any, b: any) => {
              return sortOrder ? a.line.id - b.line.id : b.line.id - a.line.id;
            })
        );
      }


      if (this.config.setStatusColorOrder !== undefined)
        this.config.setStatusColorOrder.forEach((color:string) => {
          pushToArr(this.tableLines, color);
        });
      else {
        pushToArr(this.tableLines, 'red');
        pushToArr(this.tableLines, 'yellow');
        pushToArr(this.tableLines, 'green');
        pushToArr(this.tableLines, 'grey');
      }

      this.tableLines = [];

      arr.forEach((block: any[]) => {
        block.forEach((line: any[]) => this.tableLines.push(line));
      });
      if (sortOrder) this.tableLines.reverse();
    }
  }

  //Expande a tabela via (click)
  expandLabel(i: number): void {
    if (this.expandHandler[i]) {
      this.expandHandler[i] = false;
      return;
    }
    this.expandHandler.forEach((bool, j) => (this.expandHandler[j] = false));
    this.expandHandler[i] = true;
  }

  //Renderiza a tabela
  tableConstructor(data: any[]): void {
    this.tableLines = [];
    if (data)
      data.forEach((line: any[], index: number) => {
        this.tableLines.push({
          i: index,
          line: line,
          refinedLine: this.config.columns.map((column: any) => {
            return line[column.objName];
          }),
        });
      });
  }

  //Lida com a paginação e envia a informação de volta para ao pai
  handlePagination(value: number = -1) {
    this.pagePos = value;
    this.pagePosEmitter.emit(this.pagePos);
  }

  //Na Inicialização
  ngOnInit(): void {
    this.actionTrigger = this.config.actions != undefined || this.config.expand;

    //Constrói os arrays de estado
    this.config.columns.forEach(() => {
      {
        this.sortOrder.push(false);
        this.expandHandler.push(false);
      }
    });

    //Seta uma ordenação padrão
    this.handlePagination(0); //Seta uma página padrão

    //Aviso caso expandida
    if (this.config.expand)
      console.log(
        'Aviso: Como esta tabela está expandida e necessário trazer mais dados!'
      );
  }

  //Quando um dos binds mudar
  ngOnChanges(changes: SimpleChanges): void {
    //Quando a data mudar, ele reconstruirá a tabela
    this.tableConstructor(changes['data'].currentValue);
    const sortListIndex = this.config.inicialColumnPosToSort ?? 0;
    this.sortList(
      this.config.columns[sortListIndex].type,
      sortListIndex,
      false
    ); //Executa Ordenação
  }

  //Ao inicializar a visualização
  ngAfterViewInit(): void {
    //Setando o tamanho do expand-label
    if (this.config.expand) {
      timer(1500).subscribe(
        (n) =>
          (this.expandLabelSize =
            document.querySelector('.content-wrapper')!.clientHeight + 'px')
      );
    }
  }
}
