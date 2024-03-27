import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../models/user.model';
import { StorageService } from '../../_services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User | null=null;
  selectedSkills: string[] = [];
  skills: string[] = ['JavaScript', 'Angular', 'React','MongoDB','HTML', 'Node.js','Python','Data Analytics','Java'];

  constructor(private authService: AuthService,private storageService:StorageService,private toastr:ToastrService) { }

  ngOnInit(): void {
      

    if (this.storageService.isLoggedIn()) {
       this.authService.getUserProfile().subscribe(
        (res) => {
          this.user = res.user;
          this.selectedSkills = this.user?.skills ? [...this.user.skills] : [];
          console.log('User profile:', this.user);
        },
        (error) => {
          console.error('Failed to fetch user profile', error);
          this.toastr.error('Failed to fetch user!', 'Error');
        }
      );
    } else {
      console.log('User is not logged in');
      this.toastr.warning('User not Logged in!', 'Warning');
    }
  }

  toggleSkill(skill: string) {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill); // Remove skill
    } else {
      this.selectedSkills.push(skill); // Add skill
    }
  }
  

  onSubmit() {
    if(this.user){
    this.user.skills=this.selectedSkills;
    this.authService.updateUser(this.user).subscribe(
      (updatedUser: User) => {
        console.log('User updated successfully:', updatedUser);
        this.toastr.success('Details Updated successfully!', 'Success');
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastr.error('Error updating user!', 'Error');
      }
    )
    }

  }

  
    
}
