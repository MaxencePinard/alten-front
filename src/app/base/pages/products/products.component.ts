import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'app/base/pages/products/products.service';

export const products = [
  {
    id : '0',
    name : 'Name 1',
    description : 'Description 1',
    category : 'Category 1',
    price : 50,
    stock : 'INSTOCK',
    rating : 5,
    code : 'ejhfhjfdjnsqjxcsowi'
  },
  {
    id : '1',
    name : 'Name 2 test',
    description : 'Description loooooooooooo oooooooooo oooooooooooo oooooo oooooooo ooooooooooo ooo ooooooooooooo ooooooooooooooooooo oooooooooooooooooooo oooooooooo oooooooooooooong',
    category : 'Category 2',
    price : 90,
    stock : 'LOWSTOCK',
    rating : 3,
    code : 'ejhfhjfdjnijfnsqjsowi'
  },
  {
    id : '2',
    name : 'Name 3 test',
    description : 'Description 3',
    category : 'Category 1',
    price : 25,
    stock : 'INSTOCK',
    rating : 5,
    code : 'ejhhjfdjnijfnsqjxcsowi'
  },
  {
    id : '3',
    name : 'Name 4',
    description : 'Description 4',
    category : 'Category 1',
    price : 5,
    stock : 'OUTOFSTOCK',
    rating : 4,
    code : 'ejhfhjfdjnijfnsqjxcsowi'
  }
]

export const columns = [
  {header: 'Name', field: 'name'},
  {header: 'Description', field: 'description'},
  {header: 'Category', field: 'category'},
  {header: 'Price', field: 'price'},
  {header: 'In Stock', field: 'stock'},
  {header: 'Rating', field: 'rating'},
  {header: '', field: 'addToCart'}
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = products;
  columns = columns;
  currency = 'EUR';
  sortValue = "";
  searchValue = "";

  constructor(public readonly productsService: ProductsService) {
  }

  ngOnInit(): void {

  }

  public onSort(event): void {
    this.products = this.productsService.onSort(this.products, event);
  }

  public onSearch(event): void {
    const sortInputElement = document.getElementById("sort-select") as HTMLInputElement;
    const sortValue = sortInputElement.value;
    console.log(sortValue);
    this.products = this.productsService.onSearch(products, event);
    this.products = this.productsService.onSort(this.products, sortValue);
  }
}
