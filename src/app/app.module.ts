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

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ConnectWalletComponent,
    LandingComponent,
    ExploreComponent,
    ManageComponent,
    AddProductComponent,
    OrderProductComponent,
    DeleteProductComponent,
    ReplenishStockComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
