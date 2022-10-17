import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabelaService {

  constructor(private http: HttpClient) { }

  read():Observable<JSON>{
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='USD'&@dataInicial='08-01-2022'&@dataFinalCotacao='10-31-2022'&$top=30&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    return this.http.get<JSON>(url)
  }
}
