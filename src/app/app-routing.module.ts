import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'experience',
    loadChildren:()=>import('src/app/experience/experience.module').then((m)=> m.ExperienceModule)
  },
  {
    path:'home',
    loadChildren:()=>import('src/app/home/home.module').then((m)=> m.HomeModule)
  },
  {
    path:'login',
    loadChildren:()=>import('src/app/login/login.module').then((m)=> m.LoginModule)
  },
  {
    path:'quiz',
    loadChildren:()=>import('src/app/quiz/quiz.module').then((m)=> m.QuizModule)
  },
  {
    path:'register',
    loadChildren:()=>import('src/app/register/register.module').then((m)=> m.RegisterModule)
  },
  {
    path:'users',
    loadChildren:()=>import('src/app/users/users.module').then((m)=> m.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
