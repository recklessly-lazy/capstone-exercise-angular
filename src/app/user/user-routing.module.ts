import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserhomeComponent } from "./userhome/userhome.component";

const userRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "home",
        component: UserhomeComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
