import { BuscaFormService } from './../../busca-form/busca-form.service';

import { Component, OnInit } from '@angular/core';
import { Busca } from 'src/app/busca';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busca-form',
  templateUrl: './busca-form.component.html'
})
export class BuscaFormComponent {
  cotacoes : any
  formulario: FormGroup;
  moedas = ["Dolar australiano","Dolar canadense","Euro","Dolar americano"
  ];

  submitted = false;

  constructor(private formBuilder: FormBuilder, private BuscaFormService: BuscaFormService) {
    this.formulario = this.formBuilder.group({
      moeda: ['', [Validators.required]],
      dataInicio: ['',  [Validators.required]],
      dataFim: ['', [Validators.required]],
    });

   }
ngOnInit(){
  this.formulario = this.formBuilder.group({
    moeda: ['', [Validators.required]],
    dataInicio: ['',  [Validators.required]],
    dataFim: ['', [Validators.required]],
  });
}
  onSubmit() {
    var moeda = this.formulario.get('moeda')?.value
    var dataInicio = this.formulario.get('dataInicio')?.value
    var dataFim = this.formulario.get('dataFim')?.value
    this.BuscaFormService.read(moeda,dataInicio,dataFim).subscribe(cotacoes =>{
      this.cotacoes = cotacoes
      console.log("aaaaaaaaaaa")
      console.log(this.cotacoes)
      console.log("suuuubmit")
    })
    this.submitted = true;}
}


