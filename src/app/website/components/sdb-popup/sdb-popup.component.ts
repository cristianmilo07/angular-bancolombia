import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-sdb-popup',
  templateUrl: './sdb-popup.component.html',
  styleUrls: ['./sdb-popup.component.scss']
})
export class SdbPopupComponent {
  form: FormGroup
  valueBitcoins: any[] = [
    {value: 'BTC', viewValue: 'BTC'},
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BNB', viewValue: 'BNB'},
  ];

  symbols: any[] = [
    {value: 'Bitcoin0', viewValue: 'Bitcoin'},
    {value: 'Ethereum', viewValue: 'Ethereum'},
    {value: 'Binance', viewValue: 'Binance coin'},
  ];

  selected = this.valueBitcoins[2].value;
  selecteds = this.symbols[2].value;
  constructor( private fb: FormBuilder,
               private information: ProductsService,
               private dialog: MatDialogRef<SdbPopupComponent>) {

    this.form = this.fb.group({
      simbolo: ['', Validators.required],
      Nombre: ['', Validators.required],
      tasa: ['', Validators.required],
    })
   }

   send(){
    const valueInformation: Product = {
      title: this.form.value.simbolo,
      price: this.form.value.nombre,
      taxes: this.form.value.tasa,
    }
    console.log(valueInformation)
    this.information.createBitcoinForFront(valueInformation);
    console.log(valueInformation)
    this.information.getBitcoinForFront()
    this.dialog.close(true);
   }
}
