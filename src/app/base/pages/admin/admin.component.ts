import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from 'app/base/pages/admin/admin.service';
import { ProductsService } from 'app/base/pages/products/products.service';
import { AdminProductItem } from 'app/base/pages/products/products.model';
import { DataService } from 'app/data/services/data.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginService } from 'app/data/services/login.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  columns = [];
  allColumns = [];
  editColumns = [];
  products = [];
  selectedProducts = [];
  currency = 'EUR';
  showDeleteDialog = false;
  showDeleteSelectedDialog = false;
  showModifyProductDialog = false;
  showEditColumnsDialog = false;
  modifyProductItem: AdminProductItem;
  productToDelete: AdminProductItem;
  isNew = false;

  constructor(public readonly adminService: AdminService,
    public readonly productsService: ProductsService,
    public readonly loginService: LoginService,
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

  onShowColumnEditDialog() {
    this.editColumns = _.cloneDeep(this.allColumns);
    this.showEditColumnsDialog = true;
  }

  onCheckColumn(i: number): void {
    this.editColumns[i].displayed = !this.editColumns[i].displayed;
  }

  onColumnEditValidate(): void {
    const edittedColumns = [];
    for (let i=0; i<this.editColumns.length; i++) {
      if (this.editColumns[i].displayed) {
        edittedColumns.push(this.editColumns[i].field);
      }
    }
    this.dataService.editAdminProductsColumns(this.loginService.getUserId(), edittedColumns).subscribe(response => {
      this.getAdminProductsColumns();
      this.showEditColumnsDialog = false;
    });
  }

  onColumnEditCancel(): void {
    this.showEditColumnsDialog = false;
  }

  getHidden(field): boolean {
    return !this.columns.some(col => col.field === field);
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
    this.adminService.toggleDeleteButton(false);
  }

  initProductsList(): void {
    this.dataService.getAdminProductsList().subscribe(response => {
      this.products = response;
    });
  }

  getAdminProductsColumns(): void {
    this.dataService.getUser(this.loginService.getUserId()).subscribe(response => {
      this.dataService.getAdminProductsColumns().subscribe(response2 => {
        this.allColumns = response2;
        for (let column of this.allColumns) {
          column.displayed = response.adminColumns.includes(column.field);
        }
        this.columns = response2.filter(col => response.adminColumns.includes(col.field));
      });
    });
  }

  getCurrency(): void {
    this.dataService.getCurrency().subscribe(response => {
      this.currency = response;
    });
  }
}
