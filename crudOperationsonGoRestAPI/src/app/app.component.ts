import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CrudService } from './services/crud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myApp';
  users: any[] = [];
  page: number = 1;
  userForm: FormGroup;
  editing: boolean = false;
  editingUserId: number | null = null;

  constructor(private userService: CrudService, private route: ActivatedRoute, private router: Router) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('male'),
      status: new FormControl('active'),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param)=>{
      this.page = +parseInt(param['page']) || 1;
    })
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers(this.page).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => alert(error.message)
    );
  }

  nextPage() {
    this.router.navigate(['page', this.page + 1]);
    this.page++;
    this.fetchUsers();
  }

  previousPage() {
    if (this.page > 1) {
      this.router.navigate(['page', this.page - 1]);
      this.page--;
    }
    this.fetchUsers();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;

      if (this.editing) {
        this.userService.updateUser(this.editingUserId!, user).subscribe(
          () => {
            alert('User updated successfully');
            this.fetchUsers();
            this.resetForm();
          },
          (error) => alert(error.message)
        );
      } else {
        this.userService.createUser(user).subscribe(
          () => {
            alert('User created successfully');
            this.fetchUsers();
            this.resetForm();
          },
          (error) => alert(error.message)
        );
      }
    }
  }

  editUser(user: any) {
    this.editing = true;
    this.editingUserId = user.id;
    this.userForm.patchValue(user);
  }

  confirmDelete(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          alert('User deleted successfully');
          this.fetchUsers();
        },
        (error) => alert(error.message)
      );
    }
  }

  resetForm() {
    this.editing = false;
    this.editingUserId = null;
    this.userForm.reset({ status: 'active' });
  }
}
