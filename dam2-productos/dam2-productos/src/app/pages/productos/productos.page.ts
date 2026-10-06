import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CurrencyPipe
} from '@angular/common';

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
  IonCardContent,
  IonButton
} from '@ionic/angular';

import {
  ProductModel,
  ProductsResponse
} from '../../models/product.model';

import {
  ProductService
} from '../../services/product';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
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
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {

  private productService = inject(ProductService);

  products: ProductModel[] = [];
  total = 0;
  loading = false;
  error = '';

  darkMode = false;

  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts()
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
          this.loading = false;
        },

        error: (error) => {
          console.error(error);
          this.error =
            'No se han podido cargar los productos.';
          this.loading = false;
        }
      });
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProducts(): ProductModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.products.slice(
      start,
      start + this.itemsPerPage
    );
  }

  get totalStock(): number {
    return this.products.reduce(
      (total, product) => total + product.stock,
      0
    );
  }

  get averageRating(): number {
    if (this.products.length === 0) {
      return 0;
    }

    const totalRating = this.products.reduce(
      (total, product) => total + product.rating,
      0
    );

    return totalRating / this.products.length;
  }

  get averagePrice(): number {
    if (this.products.length === 0) {
      return 0;
    }

    const totalPrice = this.products.reduce(
      (total, product) => total + product.price,
      0
    );

    return totalPrice / this.products.length;
  }

  get categories(): { name: string, count: number }[] {
    const categoryMap: {
      [key: string]: number
    } = {};

    this.products.forEach(product => {
      categoryMap[product.category] =
        (categoryMap[product.category] || 0) + 1;
    });

    return Object.entries(categoryMap)
      .map(([name, count]) => ({
        name,
        count
      }))
      .sort((a, b) => b.count - a.count);
  }

  get maxCategoryCount(): number {
    if (this.categories.length === 0) {
      return 1;
    }

    return this.categories[0].count;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle(
      'dark',
      this.darkMode
    );
  }
}

