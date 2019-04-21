import { OnDestroy, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";
import { BreadcrumbService } from "../../service/breadcrumb.service";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadCrumbComponent implements OnDestroy{

    subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}