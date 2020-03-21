import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestTabsPage} from './request-tabs.page';

const routes: Routes = [
    {
        path: 'request-tabs',
        component: RequestTabsPage,
        children: [
            {
                path: 'new-request',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../new-request/new-request.module').then(m => m.NewRequestPageModule)
                    }
                ]
            },
            {
                path: 'requests',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../requests/requests.module').then(m => m.RequestsPageModule)
                    }
                ]
            }, {
                path: 'request-details/:id',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../request-details/request-details.module').then(m => m.RequestDetailsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/request-tabs/new-request',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/request-tabs/new-request',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestTabsRoutingModule {
}
