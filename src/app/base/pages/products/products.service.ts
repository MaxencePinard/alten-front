import { Injectable } from '@angular/core';
import { PublicProductItem } from 'app/base/pages/products/products.model';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private _gridView = true;

    constructor() {

    }

    public getGridView(): boolean {
        return this._gridView;
    }

    public getListView(): boolean {
        return !this._gridView;
    }

    public toggleGridView(): void {
        this._gridView = true;
    }

    public toggleListView(): void {
        this._gridView = false;
    }

    public getStockSeverity(stock: string): string {
      switch (stock) {
        case 'INSTOCK':
          return 'success';
        case 'LOWSTOCK':
          return 'warning';
        case 'OUTOFSTOCK':
          return 'danger';
        case 'NULL':
          return 'contrast';
        default: return 'secondary'
      }
    }

    public onSort(list: PublicProductItem[], sortBy: string): PublicProductItem[] {
      const order = sortBy === 'rating' ? 'desc' : 'asc';
      return _.orderBy(list, sortBy, order);
    }

    public onSearch(list: PublicProductItem[], searchString: string): PublicProductItem[] {
      list = list.filter(p => p.name.toLocaleLowerCase().includes(searchString));
      return list;
    }
}
