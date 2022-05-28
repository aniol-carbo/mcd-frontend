import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';

import {MatButtonModule} from "@angular/material/button";
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import {MatIconModule} from "@angular/material/icon";
import { ExploreComponent } from './explore/explore.component';
import { ManageComponent } from './manage/manage.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AddProductComponent } from './manage/add-product/add-product.component';
import { OrderProductComponent } from './manage/order-product/order-product.component';
import { DeleteProductComponent } from './manage/delete-product/delete-product.component';
import { ReplenishStockComponent } from './manage/replenish-stock/replenish-stock.component';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from "@angular/material/table";
import {ExploreByPriceComponent} from "./explore/explore-by-price/explore-by-price.component";
import {ExploreByQuantityComponent} from "./explore/explore-by-quantity/explore-by-quantity.component";
import {ProductPriceComponent} from "./explore/product-price/product-price.component";
import {MatCardModule} from "@angular/material/card";
import {ProductQuantityComponent} from "./explore/product-quantity/product-quantity.component";
import {ChangePriceComponent} from "./manage/change-price/change-price.component";


@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ConnectWalletComponent,
    LandingComponent,
    ExploreComponent,
    ExploreByQuantityComponent,
    ExploreByPriceComponent,
    ManageComponent,
    AddProductComponent,
    OrderProductComponent,
    DeleteProductComponent,
    ReplenishStockComponent,
    ChangePriceComponent,
    ProductPriceComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
