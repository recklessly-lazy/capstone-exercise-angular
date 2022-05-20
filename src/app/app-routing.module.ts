import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginGuardService } from "./login/login-guard.service";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login/:role", component: LoginComponent },
    { path: "signup/:role", component: SignupComponent },
    {
        path: "user",
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
        canActivate: [
            LoginGuardService
        ]
    },
    {
        path: "coach",
        loadChildren: () =>
            import("./coach/coach.module").then((m) => m.CoachModule),
        canActivate: [
            LoginGuardService
        ]
    },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
