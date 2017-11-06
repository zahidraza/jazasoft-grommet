#**Tabular Form (TForm)**
This is tabular form. User can specify headers and data and a tabular form will be created on the basis of that
data. It also support adding of dynamic colums and rows. All data will be available via formReducer as array of records whose key is the name of data. A page can have multiple Tabular form, so in order to distinguish data of each form, user should provide name [parameter|key name]. all data will be avaialble with this name key in tableData of formReducer.

##*Attributes*
```
name: type- string;  desc- parameter | key name; default- table1;  -optional
header: type- [string|object]  -required
{
  label: type- string; -required
  tooltip: type-string; -optional
}
data: type- [[object]]; -required 
{
  type: type- string; values- label|link|select|input|checkbox; -required
  name: type- string; desc- Parameter name with which data will be available in formReducer; -required
  value: type- string|number|object; desc- object can be in case of select; -optional
  {
    label: type- string; -required
    value: type- string; -required
  }
  placeholder: type- string; -optional
  options: type- array; -optional
  searchString: type- string; desc- [select] If provided options will be filtered with this string; -optional
  disabled: type- bool; -optional
}
controls: type- string; values- add|remove; desc- action control that each row will have. not implemented yet; -optional
dynamicRow: type- bool; default- false; desc- Whether row should be added dynamically; -optional
dynamicCol: type- bool; default- false; desc- Whether column should be added dynamically; -optional
cellStyle: type- object; desc- custom styling for each cell; -optional
onChange: type- func, args- (name, row, key, value), desc- onChange method available to parent component
```
