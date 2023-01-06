import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


@Component({
  selector: 'app-dialog-pop-up',
  templateUrl: './dialog-pop-up.component.html',
  styleUrls: ['./dialog-pop-up.component.css']
})
export class DialogPopUpComponent implements OnInit {

  dropdown:any;
  @ViewChild('select') select: MatSelect;
  toppings = new FormControl();
  @Input() min: any;
  yesterday = new Date();
  time :any
  allSelected = false;
  foods: any[] = [
    { value: 'Playing', viewValue: 'Playing' },
    { value: 'swimming', viewValue: 'swimming' },
    { value: 'Dancing', viewValue: 'Dancing' },
    { value: 'Singing', viewValue: 'Singing' },
    { value: 'studying', viewValue: 'studying' },

  ];
  myForm: FormGroup;
  myControl = new FormControl('');
  filteredOptions: any;
  dropdownSettings: IDropdownSettings = {};
  selectedIndex: number = 0;
  nextbtn: any = true;
  selectpara: any;
  formData: any;
  taskDetails: any;
  taskname: any = ['Task Detail', 'View Task Details'];
  minDate = new Date();
  submitted: any = false;
  ;


  constructor(private fb: FormBuilder) {
    this.yesterday.setDate(this.yesterday.getDate() - 0);

   }

  ngOnInit(): void {
    this.formatAMPM(new Date)
    this.formData = localStorage.getItem("formData");
    this.taskDetails = JSON.parse(this.formData);

    this.myForm = this.fb.group({
      taskHeadline: ['', [Validators.required]],
      taskNames: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      comments: ['', [Validators.required]],

    });
    

    if (this.myForm.valid == false) {
      this.nextbtn = true;
    }

    this.filteredOptions = ['(GMT -12:00) Eniwetok, Kwajalein', '(GMT -11:00) Midway Island, Samoa', '(GMT -10:00) Hawaii', '(GMT -9:30) Taiohae', '(GMT -9:00) Alaska'];


  }
  formatAMPM(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    this.time = hours + ':' + minutes + ' ' + ampm;
  }
  nextStep() {

    if (this.myForm.invalid) {
      this.submitted = true;
      return;
    }
    if (this.myForm.valid == true) {
      this.submitted = true;

      if (this.selectedIndex != 1) {
        this.selectedIndex = this.selectedIndex + 1;
      }

      this.selectpara = [{

        comments: this.myForm.value.comments,
        date: this.myForm.value.date,
        taskHeadline: this.myForm.value.taskHeadline,
        time: this.myForm.value.time,
        taskNames: this.myForm.value.taskNames,
        zone: this.myForm.value.zone
      }]
      localStorage.setItem("formData", JSON.stringify(this.selectpara))
      this.formData = localStorage.getItem("formData");
      this.taskDetails = JSON.parse(this.formData);

      this.myForm.controls['taskHeadline'].disable();
      this.myForm.controls['taskNames'].disable();
      this.myForm.controls['date'].disable();
      this.myForm.controls['time'].disable();
      this.myForm.controls['zone'].disable();
      this.myForm.controls['comments'].disable();

    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
      this.myForm.controls['taskHeadline'].enable();
      this.myForm.controls['taskNames'].enable();
      this.myForm.controls['date'].enable();
      this.myForm.controls['time'].enable();
      this.myForm.controls['zone'].enable();
      this.myForm.controls['comments'].enable();

    }
  }


  getDropdownList(e: any) {

    this.autocompleteMatch(e.target.value);

  }

  autocompleteMatch(input: any) {

    var search_terms = ['(GMT -12:00) Eniwetok, Kwajalein', '(GMT -11:00) Midway Island, Samoa', '(GMT -10:00) Hawaii', '(GMT -9:30) Taiohae', '(GMT -9:00) Alaska'];

    if (input == '') {
      this.filteredOptions = search_terms;
    }
    else{
    var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
    this.filteredOptions = search_terms.filter(function (term) {
      if (term.match(reg)) {

        return term;
      }
    });
  }
    return this.filteredOptions;
  
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;

  }

  onEventDropDownChanged(i: any) {

    this.myForm.controls['taskNames'].setValue(i)
  }


  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

}

