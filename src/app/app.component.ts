import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem, PrimeIcons, FilterService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AddPartyComponent } from './Components/add-party/add-party.component';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { CashTransSelectorComponent } from './Components/cash-trans-selector/cash-trans-selector.component';
import { TradeInvoiceComponent } from './Components/trade-invoice/trade-invoice.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DialogService, MessageService]
})
export class AppComponent implements OnInit {
    constructor(
        private filterService: FilterService,
        private primengConfig: PrimeNGConfig, public dialogService: DialogService, private messageService: MessageService) {

    }
    title = 'khata';
    items: MenuItem[] = [];
    items2: MegaMenuItem[] = [];
    display: boolean = false;
    dockItems: MenuItem[] = [];
    nodes: any[] = [];
    selectedNode: any;

    text: any;
    results: string[] = []
    search(e: any) {
        // this.filteredCountries.push('hello');
        this.filteredCountries = ['a'];
        console.log(e.query);
    }




    showDialog() {
        this.display = true;
    }
    addSingle() {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    }
//how multiplay two number in function  ?  

    show(): void {
        const ref = this.dialogService.open(AddPartyComponent, {

            // header: 'Choose a Car',
            // width: '70%'
        });
    }
    itemAddDialog(){
        const ref = this.dialogService.open(AddItemComponent, {

            // header: 'Choose a Car',
            // width: '70%'
        });
    }
    
    filteredCountries: any[] = [];

    selectedCountries: any[] = [];

    filterCountry(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;


        // for (let i = 0; i < this.countries.length; i++) {
        //   let country = this.countries[i];
        //   if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        //     filtered.push(country);
        //   }
        // }

        // this.filteredCountries = filtered;
        // this.filteredCountries = ['filtered'];
    }

    ngOnInit(): void {
        
        // this.countryService.getCountries().then(countries => {
        //     this.countries = countries;
        //   });

        this.primengConfig.ripple = true;
        this.items = [
            {
                label: 'Home' ,routerLink:'/',
                



            },
            {
                label: 'Actions',
                items: [
                    {
                        label: 'Add Party', icon: 'pi pi-user-plus', command: () => {
                            this.show();
                        }
                    },
                    { label: 'Add Item', icon: 'pi pi-file-import',command: () => {
                        this.itemAddDialog();
                    } }
                ],

            },
            {
                label: 'Transactions',
                items: [
                    { label: 'Cash', icon: 'pi pi-refresh',command:()=>{this.dialogService.open(CashTransSelectorComponent,{})} },
                    { label: 'Trade', icon: 'pi pi-refresh',command:()=>{this.dialogService.open(TradeInvoiceComponent,{})} }
                ],

            },
            {
                label: 'Reports',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => { }  },
                    { label: 'Inventory List', icon: 'pi pi-server', routerLink:'inventoryList', command: () => { } },
                    { label: 'TradeSummary', icon: 'pi pi-chart-line', command: () => { } },
                    { label: 'Item List', icon: 'pi pi-list', command: () => { } ,routerLink:"/itemList"  },
                    { label: 'Party List', icon: 'pi pi-list', command: () => { } ,routerLink:"/partyList"  }
                ],



            }


        ];

        this.dockItems = [
            {
                label: 'Cash',
                // icon: "https://cdn3d.iconscout.com/3d/premium/thumb/money-3597246-3010226.png"
                icon: "https://static.vecteezy.com/system/resources/previews/012/487/843/original/payment-icon-for-shopping-online-3d-hand-holding-banknote-cartoon-businessman-wear-blue-suit-hold-money-floating-isolated-on-transparent-e-commerce-withdraw-money-concept-3d-minimal-render-png.png "
             ,command:()=>{this.dialogService.open(CashTransSelectorComponent,{})},
            },
            {
                label: 'Trade',
                icon: "https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/trust-icon.png"
                ,command:()=>{this.dialogService.open(TradeInvoiceComponent,{})},
            },
         

        ];

  


    }

    save() { }


}