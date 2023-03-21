import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorysService } from 'src/app/Services/categorys.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  private _categoryService = inject(CategorysService);
  categoryForm!: FormGroup;
  private _router = inject(Router);
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
    });
  }
  ngOnInit(): void {}
  get f() {
    return this.categoryForm.controls;
  }

  isValidForm(): boolean {
    if (this.categoryForm.invalid) {
      return false;
    }
    return true;
  }

  addCategory() {
    this.submitted = true;
    if (this.isValidForm() === true) {
      var data = this.categoryForm.value;
      this._categoryService.Add(data).subscribe({
        next: (res) => {
          this.categoryForm.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category Added',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(['/../categorys']);
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
    }
  }
  cancel() {
    this.categoryForm.reset();
    this._router.navigate(['/../categorys']);
  }
}
