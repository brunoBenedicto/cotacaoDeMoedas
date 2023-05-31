import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaFormService } from './../../busca-form/busca-form.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-busca-form',
  templateUrl: './busca-form.component.html'
})
export class BuscaFormComponent implements OnInit {
  cotacoes: any;
  formulario: FormGroup;
  moedas = ["Dolar australiano", "Dolar canadense", "Euro", "Dolar americano"];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private buscaFormService: BuscaFormService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      moeda: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
    }, { validator: this.dataFinalPosteriorDataInicialValidator() });
  }
  

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }

    const moeda: string = this.formulario.get('moeda')?.value;
    const dataInicio: string = this.formulario.get('dataInicio')?.value;
    const dataFim: string = this.formulario.get('dataFim')?.value;

    this.buscaFormService.read(moeda, dataInicio, dataFim).pipe(
      catchError(error => {
        console.log('Ocorreu um erro ao buscar as cotações:', error);
        return of(null);
      })
    ).subscribe(cotacoes => {
      if (cotacoes) {
        this.cotacoes = cotacoes;
        console.log('Cotações encontradas:', this.cotacoes);
      } else {
        console.log('Não foi possível buscar as cotações.');
      }
    });

    this.submitted = true;
  }
  dataFinalPosteriorDataInicialValidator(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const dataInicio = formGroup.get('dataInicio')?.value;
      const dataFim = formGroup.get('dataFim')?.value;
  
      if (dataInicio && dataFim && dataFim < dataInicio) {
        return { dataFinalAnterior: true };
      }
  
      return null;
    };
  }
}


