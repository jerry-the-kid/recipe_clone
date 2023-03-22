import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) f!: NgForm;
  id: number = -1;
  editMode = false;

  subscription!: Subscription;

  constructor(private shoppingService: ShoppingService) {

  }


  ngOnInit(): void {

      this.initializeForm()


  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.id, this.f.value);
    } else {
      this.shoppingService.addIngredients(this.f.value)
    }
    this.onClear();
  }

  onClear() {
    this.f.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.id);
    this.onClear();
  }

  private initializeForm(): void {
    this.subscription = this.shoppingService.idEditChange.subscribe(id => {
      if (id === -1) return;
      this.id = id;
      this.editMode = true;
      const item = this.shoppingService.getIngredient(this.id);
      this.f.setValue({name: item.name, quantity: item.quantity})
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
