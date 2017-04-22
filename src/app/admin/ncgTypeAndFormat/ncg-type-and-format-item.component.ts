// angular
import { Component, Input, OnInit } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';

// api
import * as InterfaceProviders from './../services/api/models/interface-providers';

// providers/services
import { BusyIndicatorService } from './../common/services/busyIndicator.service';
import { LocalStorageService, RestoreService } from './../common/services/dataStorage.service';
import { ValidationService } from './../common/services/validation.service';

import { DataContext } from './../services/api/rest/data-context.service';
import { DataContextLocal } from './../services/api/local/data-context-local.service';

// components
import { BaseItemComponent } from './../common/components/base-item.component';

import * as KendoDialog from '@progress/kendo-angular-dialog';

// other
import * as moment from 'moment';

@Component({
  selector: 'ncgTypeAndFormatItem',
  templateUrl: './ncg-type-and-format-item.component.html'
})

export class NcgTypeAndFormatItemComponent extends BaseItemComponent<InterfaceProviders.NcgTypeAndFormat> {


  @Input() myForm: FormGroup;

  constructor(
    protected datacontextService: DataContextLocal,    
    protected titleService: Title,
    protected busyIndicatorService: BusyIndicatorService,
    protected kendoDialog: KendoDialog.DialogService,
    protected formBuilder: FormBuilder,
    protected location: Location,
    protected restoreService: RestoreService<InterfaceProviders.NcgTypeAndFormat>,
    protected routeParams: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService
  ) {
    super(titleService, 
      datacontextService.NcgTypeAndFormatApi, 
      busyIndicatorService, 
      kendoDialog, 
      formBuilder, 
      location,
      restoreService,
      routeParams,
      router,
      validationService
    );
    
  }

  buildForm(): void {
    this.formMetaData = require('./ncg-type-and-format.metaData.json');
    this.normalizeFormMetaData();
    this.addFormValidation();

    this.myForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );

    this.onValueChanged();
  }

  private addFormValidation() {
    this.myForm = this.formBuilder.group({
      
      id: this.formMetaData.properties.id ? [
          this.formMetaData.properties.id['x-ncg'].defaultValue ? this.formMetaData.properties.id['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.id['x-ncg'].validations)
        )
      ] : null,
      
      someArray: this.formMetaData.properties.someArray ? [
          this.formMetaData.properties.someArray['x-ncg'].defaultValue ? this.formMetaData.properties.someArray['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someArray['x-ncg'].validations)
        )
      ] : null,
      
      someBoolean: this.formMetaData.properties.someBoolean ? [
          this.formMetaData.properties.someBoolean['x-ncg'].defaultValue ? this.formMetaData.properties.someBoolean['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someBoolean['x-ncg'].validations)
        )
      ] : null,
      
      someIntegerInt32: this.formMetaData.properties.someIntegerInt32 ? [
          this.formMetaData.properties.someIntegerInt32['x-ncg'].defaultValue ? this.formMetaData.properties.someIntegerInt32['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someIntegerInt32['x-ncg'].validations)
        )
      ] : null,
      
      someNumber: this.formMetaData.properties.someNumber ? [
          this.formMetaData.properties.someNumber['x-ncg'].defaultValue ? this.formMetaData.properties.someNumber['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someNumber['x-ncg'].validations)
        )
      ] : null,
      
      someNumberDouble: this.formMetaData.properties.someNumberDouble ? [
          this.formMetaData.properties.someNumberDouble['x-ncg'].defaultValue ? this.formMetaData.properties.someNumberDouble['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someNumberDouble['x-ncg'].validations)
        )
      ] : null,
      
      someString: this.formMetaData.properties.someString ? [
          this.formMetaData.properties.someString['x-ncg'].defaultValue ? this.formMetaData.properties.someString['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someString['x-ncg'].validations)
        )
      ] : null,
      
      someStringDateTime: this.formMetaData.properties.someStringDateTime ? [
          this.formMetaData.properties.someStringDateTime['x-ncg'].defaultValue ? this.formMetaData.properties.someStringDateTime['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someStringDateTime['x-ncg'].validations)
        )
      ] : null,
      
      someStringUid: this.formMetaData.properties.someStringUid ? [
          this.formMetaData.properties.someStringUid['x-ncg'].defaultValue ? this.formMetaData.properties.someStringUid['x-ncg'].defaultValue : null,
          Validators.compose(
          this.validationService.generateValidators(this.formMetaData.properties.someStringUid['x-ncg'].validations)
        )
      ] : null,
    });
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}
