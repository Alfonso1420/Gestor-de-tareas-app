import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesCreatePageRoutingModule } from './categories-create-routing.module';

import { CategoriesCreatePage } from './categories-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesCreatePageRoutingModule
  ],
  declarations: [CategoriesCreatePage]
})
export class CategoriesCreatePageModule {}
