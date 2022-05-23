import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectWalletComponent} from "./connect-wallet/connect-wallet.component";
import {LandingComponent} from "./landing/landing.component";
import {ExploreComponent} from "./explore/explore.component";
import {ManageComponent} from "./manage/manage.component";
import {AddProductComponent} from "./manage/add-product/add-product.component";
import {OrderProductComponent} from "./manage/order-product/order-product.component";
import {DeleteProductComponent} from "./manage/delete-product/delete-product.component";
import {ReplenishStockComponent} from "./manage/replenish-stock/replenish-stock.component";
import {ExploreByQuantityComponent} from "./explore/explore-by-quantity/explore-by-quantity.component";
import {ExploreByPriceComponent} from "./explore/explore-by-price/explore-by-price.component";

const routes: Routes = [
  { path: '', component: ConnectWalletComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'manage/add_product', component: AddProductComponent, pathMatch: 'full' },
  { path: 'manage/order_product', component: OrderProductComponent, pathMatch: 'full' },
  { path: 'manage/delete_product', component: DeleteProductComponent, pathMatch: 'full' },
  { path: 'manage/replenish_stock', component: ReplenishStockComponent, pathMatch: 'full' },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore/quantity', component: ExploreByQuantityComponent },
  { path: 'explore/price', component: ExploreByPriceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
