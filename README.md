# Angular Autocomplete
This is a shared module for Angular that you can include just about anywhere. The challenge was to have single instance autocomplete for all pages and to be able to look into more than one field.
So you can pass an object with many keys and tell the autocomplete where to look.

## Usage
1. Include the Module in the Imports section of the module of the page you are going to use it.
2. Import the autocomplete in your HTML
3. Add click action to something in order to call the autocomplete
4. Write a method that will accept the emit from the autocomplete


## Example

```
<app-autocomplete-include #locationsAc [arr]="locations" [lookIn]="['keywords', 'country', 'city', 'state']" title="Select location" (onchange)="acchange($event)"></app-autocomplete-include>

<button (click)="locationsAc.show()">Show autocomplete</button>
```

```
locations = [
    {country: 'USA', city: 'New York City', state: 'NY', keywords: 'nyc, harlem, manhattan'},
    {country: 'USA', city: 'Los Angeles', state: 'LA'},
    {country: 'United Kingdom', city: 'London', keywords: 'uk, england, europe'},
    {country: 'Canada', city: 'Toronto', state: 'Ontario'},
    {country: 'Germany', city: 'Berlin', keywords: 'europe'},
    {country: 'Germany', city: 'Frankfurt', keywords: 'hesse, europe'},
    {country: 'Australia', city: 'Sydney', state: 'New South Wales', keywords: 'hesse, europe'},
    {country: 'Australia', city: 'Newcastle', state: 'New South Wales'},
    {country: 'Australia', city: 'Melbourne', state: 'Victoria'},
];
acchange(e) {
    if (!e) return; // can be null if the field is empty
    console.log(e);
}
```

1. arr = the array to filter in
2. lookIn = which object keys of the array to use for the filter
3. title = the title of the autocomplete
4. onchange = when something is selected this will emit the whole object
