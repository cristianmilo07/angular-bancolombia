import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  informationBitcoin: Product[] = [
    {id: '1' , category: {id: "1", name: "tes"} , title: 'Bitcoin', taxes: 0, price: 0},
    {id: '2' , category: {id: "1", name: "tes"} , title: 'asas', taxes: 0, price: 0},
    {id: '3' , category: {id: "1", name: "tes"} , title: 'sdfsdf', taxes: 0, price: 0},
    {id: '4' , category: {id: "1", name: "tes"} , title: 'ff', taxes: 0, price: 0},
    {id: '5' , category: {id: "1", name: "tes"} , title: 'Ba', taxes: 0, price: 0},
    {id: '6' , category: {id: "1", name: "tes"} , title: 'asdf', taxes: 0, price: 0},
  ];

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    )
    ;
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto de la moneda bitcoins no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Algo fallo');
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    })
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getBitcoinForFront() {
    return this.informationBitcoin.slice();
  }

  deleteBitcoinForFront(index: number) {
    this.informationBitcoin.splice(index, 1)
  }

  createBitcoinForFront(information:Product){
    this.informationBitcoin.push(information);
  }
}
