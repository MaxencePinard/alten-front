import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AdminProductItem } from 'app/base/pages/products/products.model';

const pathRoot = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getProductsList(): Observable<any> { // récupération des produits à afficher sur la page Products
    return this.http.get(pathRoot + 'products');
  }

  getAdminProductsList(): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.get(pathRoot + 'adminProducts');
  }

  createNewProduct(product: AdminProductItem): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.post(pathRoot + 'newProduct', product);
  }

  modifyProduct(product: AdminProductItem): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.put(pathRoot + 'products/' + product._id, product);
  }

  deleteProduct(product: AdminProductItem): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.delete(pathRoot + 'products/' + product._id);
  }

  getProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Products
    return this.http.get(pathRoot + 'columns/' + environment.lang);
  }

  getAdminProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Admin
    return this.http.get(pathRoot + 'adminColumns/' + environment.lang);
  }

  getCurrency(): Observable<any> { // récupération de la devise utilisée
    return this.http.get(pathRoot + 'currency');
  }
}
