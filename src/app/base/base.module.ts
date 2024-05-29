import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemeToggleButtonComponent } from 'app/base/theme-toggle-button/theme-toggle-button.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductsComponent } from './pages/products/products.component';
import { PublicProductItemComponent } from './pages/products/product-item.component';
import { AdminComponent } from 'app/base/pages/admin/admin.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from 'app/base/login/login.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    ThemeToggleButtonComponent,
    BreadcrumbComponent,
    ProductsComponent,
    PublicProductItemComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    DialogModule
  ],
  exports: [NavbarComponent, FooterComponent, SidenavComponent, BreadcrumbComponent]
})
export class BaseModule {}
