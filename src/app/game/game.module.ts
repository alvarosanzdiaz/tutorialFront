import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-list/game-item/game-item.component';
import { GameEditComponent } from './game-edit/game-edit.component';



@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    GameEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
