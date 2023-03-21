import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorysService } from 'src/app/Services/categorys.service';
import { ProcessImgService } from 'src/app/Services/process-img.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  submitted: boolean = false;
  imgPreview: string = '';
  categories: any = [];
  productId: number = 0;
  private _categoryService = inject(CategorysService);
  constructor(
    private fb: FormBuilder,
    private pImageService: ProcessImgService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      barcode: ['', [Validators.required]],
      salePrice: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      status: [true, [Validators.required]],
      imagen: [''],
      fk_IdCategory: [Number, [Validators.required]],
    });
  }
  private _router = inject(Router);
  private _produService = inject(ProductsService);
  private _envio = inject(ShipmentService);

  ngOnInit(): void {
    this._categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
    this._envio.getInfoProduct().subscribe({
      next: (info) => {
        if (info !== '') {
          this.productId = info;
          this.gProduct();
        }
      },
    });
  }

  get f() {
    return this.productForm.controls;
  }

  isValidForm(): boolean {
    if (this.productForm.invalid) {
      return false;
    }
    return true;
  }

  catchPhoto(event: any) {
    this.pImageService
      .extraerBase64(event.target.files[0])
      .then((image: any) => {
        this.productForm.get('imagen')?.setValue(image.base);
        this.imgPreview = image.base;
      });
  }

  addProduct() {
    console.log(this.productForm.value);
    this.submitted = true;
    if (this.isValidForm() === true) {
      if (this.productId == 0) {
        this.productForm.value.status = Boolean(this.productForm.value.status);
        var data = this.productForm.value;
        this._produService.Add(data).subscribe({
          next: (res) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Product Added',
              showConfirmButton: false,
              timer: 1500
            })
            this.productForm.reset();
            this._router.navigate(['/../products']);
          },
          error: (e) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Algo salio mal',
              showConfirmButton: false,
              timer: 1500
            })
          },
        });
      } else {
        this.Update();
      }
    }
  }

  gProduct() {
    this._produService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.productForm.patchValue({
          name: res.name,
          barcode: res.barcode,
          salePrice: res.salePrice,
          amount: res.amount,
          status: res.status,
          imagen: res.imagen,
          fk_IdCategory: res.fk_IdCategory,
        });
        this.imgPreview = res.imagen;
      },
      error: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Algo salio mal',
          showConfirmButton: false,
          timer: 1500
        })
      },
    });
  }

  Update() {
    this._produService
      .Update(this.productId, this.productForm.value)
      .subscribe({
        next: (res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Product Updated',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(['products']);
          this.productForm.reset();
        },
        error: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Algo salio mal',
            showConfirmButton: false,
            timer: 1500
          })
        },
      });
  }
  cancel() {
    this.productForm.reset();
    this._envio.setInfoProduct('');
    this._router.navigate(['products']);
  }
}
