import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminProductItem } from 'app/base/pages/products/products.model';
import * as _ from 'lodash'

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private _deleteButtonEnabled = false;
    private _isCodeValid = true;
    private _isDescriptionValid = true;
    private _isNameValid = true;
    private _isStockValid = true;
    private _isCategoryValid = true;
    private _isPriceValid = true;

    constructor() {

    }

    public getDeleteButtonEnabled(): boolean {
        return this._deleteButtonEnabled;
    }

    public toggleDeleteButton(toggle: boolean): void {
        this._deleteButtonEnabled = toggle;
    }

    public onSort(list: AdminProductItem[], sortBy: string): AdminProductItem[] {
      const order = sortBy === 'rating' ? 'desc' : 'asc';
      return _.orderBy(list, sortBy, order);
    }

    public onSearch(list: AdminProductItem[], searchString: string): AdminProductItem[] {
      list = list.filter(p => p.name.toLocaleLowerCase().includes(searchString));
      return list;
    }

    public getIsCodeValid(): boolean {
        return this._isCodeValid;
    }

    public getIsDescriptionValid(): boolean {
        return this._isDescriptionValid;
    }

    public getIsNameValid(): boolean {
        return this._isNameValid;
    }

    public getIsStockValid(): boolean {
        return this._isStockValid;
    }

    public getIsCategoryValid(): boolean {
        return this._isCategoryValid;
    }

    public getIsPriceValid(): boolean {
        return this._isPriceValid;
    }

    public resetValid(): void {
        this._isCodeValid = true;
        this._isDescriptionValid = true;
        this._isNameValid = true;
        this._isStockValid = true;
        this._isCategoryValid = true;
        this._isPriceValid = true;
    }

    public isProductValid(product: AdminProductItem): boolean {
      this.resetValid();
      let isValid = true;
      if (product.code.length === 0) {
        isValid = false;
        this._isCodeValid = false;
      }
      if (product.description.length === 0){
        isValid = false;
        this._isDescriptionValid = false;
      }
      if (product.name.length === 0){
        isValid = false;
        this._isNameValid = false;
      }
      if (product.stock.length === 0){
        isValid = false;
        this._isStockValid = false;
      }
      if (product.category.length === 0){
        isValid = false;
        this._isCategoryValid = false;
      }
      if (!product.price || product.price < 0){
        isValid = false;
        this._isPriceValid = false;
      }
      return isValid;
    }

    public getProductsIdList(products: AdminProductItem[]): string[] {
      const idList = [];
      for (let i=0; i<products.length; i++) {
        idList.push(products[i]._id);
      }
      return idList;
    }
}
