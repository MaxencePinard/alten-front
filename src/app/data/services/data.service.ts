import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AdminProductItem } from 'app/base/pages/products/products.model';

const pathRoot = "http://localhost:3000/api/";
const productsRoute = pathRoot + "products";
const columnsRoute = pathRoot + "columns";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getProductsList(): Observable<any> { // récupération des produits à afficher sur la page Products
    return this.http.get(productsRoute + '/public');
  }

  getAdminProductsList(): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.get(productsRoute + '/admin');
  }

  createNewProduct(product: AdminProductItem): Observable<any> { // création d'un nouveau produit
    return this.http.post(productsRoute + '/newProduct', product);
  }

  modifyProduct(product: AdminProductItem): Observable<any> { // modification d'un produit
    return this.http.put(productsRoute + '/' + product._id, product);
  }

  deleteProduct(product: AdminProductItem): Observable<any> { // suppression d'un produit
    return this.http.delete(productsRoute + '/' + product._id);
  }

  deleteSelectedProducts(products: string[]): Observable<any> { // suppression des produits sélectionnés
    return this.http.delete(productsRoute, {headers: this.headers, body: products});
  }

  getProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Products
    return this.http.get(columnsRoute + '/' + environment.lang);
  }

  getAdminProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Admin
    return this.http.get(columnsRoute + '/adminColumns/' + environment.lang);
  }

  getCurrency(): Observable<any> { // récupération de la devise utilisée
    return this.http.get(pathRoot + 'currency');
  }
}
