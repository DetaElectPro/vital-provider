import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
    },
    // {
    //     path: 'requests',
    //     loadChildren: () => import('./Pages/request/request-tabs/request-tabs.module').then(m => m.RequestTabsPageModule)
    // },
    {
        path: 'requests',
        loadChildren: () => import('./Pages/request/requests/requests.module').then(m => m.RequestsPageModule)
    },
    {
        path: 'history',
        loadChildren: () => import('./Pages/Request/history/history.module').then(m => m.HistoryPageModule)
    },
    {
        path: 'request-details/:id',
        loadChildren: () => import('./Pages/Request/request-details/request-details.module').then(m => m.RequestDetailsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./Pages/Auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./Pages/Auth/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'ambulance',
        loadChildren: () => import('./Pages/ambulance/ambulance.module').then(m => m.AmbulancePageModule)
    },
    {
        path: 'medical-board',
        loadChildren: () => import('./Pages/Profiles/medical-board/medical-board.module').then(m => m.MedicalBoardPageModule)
    },
    {
        path: 'web-view',
        loadChildren: () => import('./Pages/web-view/web-view.module').then(m => m.WebViewPageModule)
    },
    {
        path: 'emergency-request',
        loadChildren: () => import('./Pages/emergency/request/request.module').then(m => m.RequestPageModule)
    },
    {
        path: 'emergency-history',
        loadChildren: () => import('./Pages/emergency/history/history.module').then(m => m.HistoryPageModule)
    },
    {
        path: 'new-request',
        loadChildren: () => import('./Pages/Request/new-request/new-request.module').then(m => m.NewRequestPageModule)
    },
    {
        path: 'map',
        loadChildren: () => import('./Pages/map/map.module').then(m => m.MapPageModule)
    },
    {
        path: 'doctore',
        loadChildren: () => import('./Pages/doctore/doctore.module').then(m => m.DoctorePageModule)
    }


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
