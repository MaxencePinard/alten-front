import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from 'app/base/pages/admin/admin.service';
import { ProductsService } from 'app/base/pages/products/products.service';
import { AdminProductItem } from 'app/base/pages/products/products.model';
import { DataService } from 'app/data/services/data.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  columns = [];
  products = [];
  selectedProducts = [];
  currency = 'EUR';
  showDeleteDialog = false;
  showDeleteSelectedDialog = false;
  showModifyProductDialog = false;
  modifyProductItem: AdminProductItem;
  productToDelete: AdminProductItem;
  isNew = false;

  constructor(public readonly adminService: AdminService,
    public readonly productsService: ProductsService,
    public readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.initProductsList();
    this.getAdminProductsColumns();
    this.getCurrency();
  }

  onCheck(): void {
    this.adminService.toggleDeleteButton(this.selectedProducts.length > 0);
  }

  getHidden(index): boolean {
    return this.columns[index] ? !this.columns[index].displayed : false;
  }

  onNewItemInit() {
    this.modifyProductItem = {
      "_id": "",
      "name": "",
      "description": "",
      "category": "",
      "price": null,
      "stock": "",
      "rating": 0,
      "code": "",
      "isSelected": false
    };
    this.isNew = true;
    this.showModifyProductDialog = true;
  }

  onRowEditInit(product: AdminProductItem) {
    this.modifyProductItem = product;
    this.showModifyProductDialog = true;
    this.isNew = false;
  }

  onRowEditSave() {
    if (this.adminService.isProductValid(this.modifyProductItem)) {
      if (this.isNew) {
        this.dataService.createNewProduct(this.modifyProductItem).subscribe(response => {
          this.showModifyProductDialog = false;
          this.isNew = false;
          this.initProductsList();
        });
      } else {
        this.dataService.modifyProduct(this.modifyProductItem).subscribe(response => {
          this.showModifyProductDialog = false;
          this.isNew = false;
        });
      }
    }
  }

  onRowEditCancel() {
    this.showModifyProductDialog = false;
    this.modifyProductItem = null;
    this.isNew = false;
    this.adminService.resetValid();
  }

  showDelete(product: AdminProductItem) {
    this.showDeleteDialog = true;
    this.productToDelete = product;
  }

  confirmDelete() {
    console.log(this.productToDelete);
    this.dataService.deleteProduct(this.productToDelete).subscribe(response => {
      this.showModifyProductDialog = false;
      this.isNew = false;
      this.initProductsList();
    });
    this.showDeleteDialog = false;
  }

  cancelDelete() {
    this.showDeleteDialog = false;
    this.showDeleteSelectedDialog = false;
  }

  showDeleteSelected() {
    this.showDeleteSelectedDialog = true;
  }

  confirmDeleteSelected() {
    const idList = this.adminService.getProductsIdList(this.selectedProducts);
    this.dataService.deleteSelectedProducts(idList).subscribe(response => {
      this.showModifyProductDialog = false;
      this.isNew = false;
      this.initProductsList();
    });
    this.showDeleteSelectedDialog = false;
  }

  initProductsList(): void {
    this.dataService.getAdminProductsList().subscribe(response => {
      this.products = response;
    });
  }

  getAdminProductsColumns(): void {
    this.dataService.getAdminProductsColumns().subscribe(response => {
      this.columns = response;
    });
  }

  getCurrency(): void {
    this.dataService.getCurrency().subscribe(response => {
      this.currency = response;
    });
  }
}
