import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class CatalogoPage implements OnInit {
  private storeService = inject(ProductService);

  products: ProductModel[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.storeService.getProducts().subscribe({
      next: (data) => {
        this.products = data.products;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error crítico al conectar con la API';
        this.loading = false;
      }
    });
  }
}
