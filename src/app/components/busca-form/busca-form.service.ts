import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaFormService {

 
  selecionaMoeda(moeda:string):string | null{
    var moedaSelecionada:string
    switch (moeda){
      case "Dolar australiano":
        return "AUD"
      case "Dolar canadense":
        return "CAD"
      case "Euro":
        return"EUR"
      case "Dolar americano":
       return"USD"
      default: return null
    }
  }
  formataData(data:string):string{
    var dataf =data.split('-').reverse()
    var dataAux:string
    dataAux = dataf[0]
    dataf[0] = dataf[1]
    dataf[1] = dataAux
    return dataf.join('-')
  }

  constructor(private http: HttpClient) {
  }

read(moeda:string, inicio:string, fim:string):Observable<JSON>{
    var moedaSelecionada = this.selecionaMoeda(moeda)
    var iniciof = this.formataData(inicio)
    var fimf = this.formataData(fim)
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${moedaSelecionada}'&@dataInicial='${iniciof}'&@dataFinalCotacao='${fimf}'&$top=30&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    console.log(`leu a read buscaService ${moedaSelecionada} ${iniciof}  ${fimf}`)
    console.log(this.selecionaMoeda(moeda))
    return this.http.get<JSON>(url)
  }
}
