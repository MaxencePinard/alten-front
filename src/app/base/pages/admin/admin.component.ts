import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from 'app/base/pages/admin/admin.service';
import { ProductsService } from 'app/base/pages/products/products.service';
import { products } from 'app/base/pages/products/products.component';
import { AdminProductItem } from 'app/base/pages/products/products.model';

export const adminColumns = [
  {header: '', field: 'checkbox', sortable: false, searchable: false},
  {header: 'Code', field: 'code', sortable: true, searchable: true},
  {header: 'Name', field: 'name', sortable: true, searchable: true},
  {header: 'Description', field: 'description', sortable: false, searchable: false},
  {header: 'Category', field: 'category', sortable: true, searchable: true},
  {header: 'Price', field: 'price', sortable: true, searchable: false},
  {header: 'En Stock', field: 'stock', sortable: true, searchable: false},
  {header: 'Rating', field: 'rating', sortable: true, searchable: false},
  {header: 'Actions', field: 'actions', sortable: false, searchable: false}
]

export const displayedColumns = [0, 1, 2, 8]

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() public lang = 'en';

  columns = [];
  displayedColumns = [];
  products = [];
  selectedProducts = [];
  editing: false;
  clonedProducts: { [s: string]: AdminProductItem } = {};
  constructor(public readonly adminService: AdminService, public readonly productsService: ProductsService) {
  }

  ngOnInit(): void {
    for (let i=0; i<products.length; i++) {
      this.products.push(products[i]);
      this.products[i].isSelected = false;
    }
    for (let i=0; i<adminColumns.length; i++) {
      if (displayedColumns.includes(i)) {
        this.columns.push(adminColumns[i]);
      }
    }

    this.displayedColumns = displayedColumns;
  }

  onCheck(): void {
    console.log(this.selectedProducts);
    this.adminService.toggleDeleteButton(this.selectedProducts.length > 0);
  }

  getHidden(index): boolean {
    return !this.displayedColumns.includes(index);
  }

  onRowEditInit(product: AdminProductItem) {
    console.log(this.editing);
    this.clonedProducts[product.code as string] = { ...product };
  }

  onRowEditSave(product: AdminProductItem) {
    delete this.clonedProducts[product.code as string];
  }

  onRowEditCancel(product: AdminProductItem, index: number) {
    this.products[index] = this.clonedProducts[product.code as string];
    delete this.clonedProducts[product.code as string];
  }
}
