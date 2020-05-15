import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'setting',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../setting/setting.module').then(m => m.SettingPageModule), canActivate: [AuthGuard]
                    }
                ]
            }, {
                path: 'wallet',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../user-pages/wallet/wallet.module').then(m => m.WalletPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
