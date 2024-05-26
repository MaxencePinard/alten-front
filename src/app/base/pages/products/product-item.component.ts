import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicProductItem } from 'app/base/pages/products/products.model';
import { ProductsService } from 'app/base/pages/products/products.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class PublicProductItemComponent implements OnInit {

  @Input() product: PublicProductItem;

  constructor(public readonly productsService: ProductsService) {
    if (!this.product) {
      this.product = {
        id : _.uniqueId("unknownProduct_"),
        name : 'Name',
        description : 'Description',
        category : 'Category',
        price : 0,
        stock : 'NULL',
        rating : 5,
        code: 'unk'
      }
    } else {
      if (!this.product.stock) {
        this.product.stock = 'UNKNOWN'
      }
      if (!this.product.id) {
        this.product.id = _.uniqueId("unknownProduct_")
      }
    }
  }

  ngOnInit(): void {

  }
}
