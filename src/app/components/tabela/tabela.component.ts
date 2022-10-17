import { TabelaService } from './tabela.service';
import { AfterViewInit, Component, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Cotacao } from '../cotacao/cotacao.model';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Cotacao>;


  @Input() cotacoes : any
  displayedColumns = ['cotacaoCompra', 'cotacaoVenda', 'dataHoraCotacao'];

  constructor() {

  }
  ngAfterViewInit(): void {
    this.cotacoes.value.sort = this.sort;
    this.cotacoes.value.paginator = this.paginator;
    this.table.dataSource = this.cotacoes.value;
  }
}
