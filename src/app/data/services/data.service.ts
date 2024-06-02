import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AdminProductItem } from 'app/base/pages/products/products.model';
import { User } from 'app/base/login/login.model';
import { CookieService } from 'app/data/services/cookies.service';

const pathRoot = "http://localhost:3000/api/";
const productsRoute = pathRoot + "products";
const columnsRoute = pathRoot + "columns";
const authRoute = pathRoot + "auth";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, public readonly cookieService: CookieService) {
  }

  getHeaders(): HttpHeaders {
    const headerToken = 'Bearer ' + this.cookieService.get('authToken');
    const headers= new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', headerToken);
    return headers;
  }

  getProductsList(): Observable<any> { // récupération des produits à afficher sur la page Products
    return this.http.get(productsRoute + '/public');
  }

  getAdminProductsList(): Observable<any> { // récupération des produits à afficher sur la page Admin
    return this.http.get(productsRoute + '/admin', {headers: this.getHeaders()});
  }

  createNewProduct(product: AdminProductItem): Observable<any> { // création d'un nouveau produit
    return this.http.post(productsRoute + '/newProduct', product);
  }

  modifyProduct(product: AdminProductItem): Observable<any> { // modification d'un produit
    return this.http.put(productsRoute + '/' + product._id, product);
  }

  deleteProduct(product: AdminProductItem): Observable<any> { // suppression d'un produit
    return this.http.delete(productsRoute + '/' + product._id, {headers: this.getHeaders()});
  }

  deleteSelectedProducts(products: string[]): Observable<any> { // suppression des produits sélectionnés
    return this.http.delete(productsRoute, {headers: this.getHeaders(), body: products});
  }

  getProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Products
    return this.http.get(columnsRoute + '/' + environment.lang);
  }

  getAdminProductsColumns(): Observable<any> { // récupération des colonnes traduites à afficher sur la page Admin
    return this.http.get(columnsRoute + '/adminColumns/' + environment.lang, {headers: this.getHeaders()});
  }

  editAdminProductsColumns(id, columns): Observable<any> { // récupération des colonnes traduites à afficher sur la page Admin
    return this.http.put(authRoute + '/adminColumns', {id: id, columns: columns});
  }

  getCurrency(): Observable<any> { // récupération de la devise utilisée
    return this.http.get(pathRoot + 'currency');
  }

  login(email: string, password:  string): Observable<any> {
    return this.http.post(authRoute + '/login', {email: email, password: password});
  }

  signup(user: User): Observable<any> {
    return this.http.post(authRoute + '/signup', user);
  }

  getUser(id: string): Observable<any> {
    return this.http.post(authRoute + '/getUser', {id: id});
  }

  editUser(user: User): Observable<any> {
    return this.http.put(authRoute + '/editUser', user);
  }
}
