import {Component, OnInit} from '@angular/core';
import {ShoppingService} from "./shopping.service";
import {Ingredient} from "../shared/Ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) {
  }

  onEditItem(index : number){
    this.shoppingService.idEditChange.next(index);
  }
  ngOnInit(): void {
    this.shoppingService.ingredientChange.subscribe(ingredients => {
      this.ingredients = ingredients;
    })
  }

}
