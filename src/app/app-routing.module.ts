import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectWalletComponent} from "./shared/connect-wallet/connect-wallet.component";
import {LandingComponent} from "./shared/landing/landing.component";
import {ExploreComponent} from "./shared/explore/explore.component";
import {ManageComponent} from "./shared/manage/manage.component";
import {AddProductComponent} from "./shared/manage/add-product/add-product.component";
import {OrderProductComponent} from "./shared/manage/order-product/order-product.component";
import {DeleteProductComponent} from "./shared/manage/delete-product/delete-product.component";
import {ReplenishStockComponent} from "./shared/manage/replenish-stock/replenish-stock.component";
import {ExploreByQuantityComponent} from "./shared/explore/explore-by-quantity/explore-by-quantity.component";
import {ExploreByPriceComponent} from "./shared/explore/explore-by-price/explore-by-price.component";
import {ProductPriceComponent} from "./shared/explore/product-price/product-price.component";
import {ProductQuantityComponent} from "./shared/explore/product-quantity/product-quantity.component";
import {ChangePriceComponent} from "./shared/manage/change-price/change-price.component";

const routes: Routes = [
  { path: '', component: ConnectWalletComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'manage/add_product', component: AddProductComponent, pathMatch: 'full' },
  { path: 'manage/order_product', component: OrderProductComponent, pathMatch: 'full' },
  { path: 'manage/delete_product', component: DeleteProductComponent, pathMatch: 'full' },
  { path: 'manage/replenish_stock', component: ReplenishStockComponent, pathMatch: 'full' },
  { path: 'manage/change_price', component: ChangePriceComponent, pathMatch: 'full' },
  { path: 'explore', component: ExploreComponent },
  { path: 'explore/quantity', component: ProductQuantityComponent },
  { path: 'explore/price', component: ProductPriceComponent },
  { path: 'explore/transactions/quantity', component: ExploreByQuantityComponent },
  { path: 'explore/transactions/price', component: ExploreByPriceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
