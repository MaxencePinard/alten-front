import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminProductItem } from 'app/base/pages/products/products.model';
import * as _ from 'lodash'

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private _deleteButtonEnabled = false;

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
}
