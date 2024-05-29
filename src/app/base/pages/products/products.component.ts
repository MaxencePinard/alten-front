import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'app/base/pages/products/products.service';
import { DataService } from 'app/data/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  allProducts = [];
  columns = [];
  currency = 'EUR';
  sortValue = "";
  searchValue = "";

  constructor(public readonly productsService: ProductsService, public readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.getProductsList();
    this.getProductsColumns();
    this.getCurrency();
  }

  public onSort(event): void {
    this.products = this.productsService.onSort(this.products, event);
  }

  public onSearch(event): void {
    const sortInputElement = document.getElementById("sort-select") as HTMLInputElement;
    const sortValue = sortInputElement.value;
    this.products = this.productsService.onSearch(this.allProducts, event);
    this.products = this.productsService.onSort(this.products, sortValue);
  }

  public getProductsList(): void {
    this.dataService.getProductsList().subscribe(response => {
      this.products = response;
      this.allProducts = response;
    });
  }

  public getProductsColumns(): void {
    this.dataService.getProductsColumns().subscribe(response => {
      this.columns = response;
    });
  }

  public getCurrency(): void {
    this.dataService.getCurrency().subscribe(response => {
      this.currency = response;
    });
  }
}
