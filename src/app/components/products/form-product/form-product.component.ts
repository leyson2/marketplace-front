import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcessImgService } from 'src/app/Services/process-img.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  submitted: boolean = false;
  imgPreview: string = '';
  constructor(
    private fb: FormBuilder,
    private pImageService: ProcessImgService,
    private toastr: ToastrService
  ) {}
  private _router = inject(Router);
  private _produService = inject(ProductsService);
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      barcode: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      status: [true, [Validators.required]],
      imagen: ['']
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
    this.submitted = true;
    if (this.isValidForm() === true) {
      this.productForm.value.status = Boolean(this.productForm.value.status);
      var data = this.productForm.value;
      this._produService.Add(data).subscribe({
        next: (res) => {
          this.toastr.success('Product Added');
          this.productForm.reset();
          this._router.navigate(['/../products']);
        },
        error: (e) => {
          //this.toastr.error('Algo salio mal');
          alert('mal');
        },
      });
    }
  }
}
