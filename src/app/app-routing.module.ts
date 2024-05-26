import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/base/pages/home/home.component';
import { ProductsComponent } from 'app/base/pages/products/products.component';
import { AdminComponent } from 'app/base/pages/admin/admin.component';
import { PagenotfoundComponent } from 'app/base/pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
