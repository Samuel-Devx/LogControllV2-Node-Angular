import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupModule, InputGroup } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

interface City {
    name: string;
    code: string;
}
@Component({
  selector: 'app-new',
  imports: [
    InputGroup,
    FormsModule,
    SelectModule,
    InputGroupModule,
    InputNumberModule,
    InputTextModule,
    InputGroupAddonModule, 
    CardModule,
    ButtonModule
  ],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class New {
    text1: string | undefined;
    text2: string | undefined;
    number: string | undefined;
    selectedCity: City | undefined;
    cities: City[] | undefined;
text3: any;
}
