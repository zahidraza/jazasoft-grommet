# GTable Usage:

Following attributes can be used in GTable component.

### attr: data, type: [Object] , required
Data to be displayed in Table. It is an array of Objects. Which key of the object will be displayed is decided by key in header attribute.

###  attr: headers, type: [String] | [Object],  required
*suggestion. rename headers to header*

It is an array of String or Object. 

[String]: It serves to purpose. first, As header if container is table. second, As key of the data object which will be selected for displaying.

[Object]: Object definition is {key: String, label: String, tooltip: String}

Functions same as array of String but with additional customization. Here, key to be selected from data object and table header can be different. label is table header and key is the field to be selected from object. tooltip is addition info which is diplayed when mouse is hovered on header.

### attr: container, values: table|list, default: table
table: contents will be displayed as table with header

list: contents will be displayed as list without header

### attr: pageSize, type: number, default: 15
Number of elements to be displayed at once it data is too large. rest data will be displayed as user scrolls down.

### attr: scope, values: none|read|update|delete|archive, default: none
*suggestion: rename scope to controls or actions, values can be none|view|edit|delete|archive*

It adds Action icon for view or update ...

### attr: onClick, type: function, args: (action, index)  optional
It is used with scope. Action to perform when user clicks on action icon. 
user function will get `action` performed (read|update|delete|archive) and `index` of element as arguments.


### attr: width, type: String, default: auto
String: small|medium|large|xlarge|xxlarge

### attr: full, values: true|false|horizontal|vertical, default: false

### attr: colorIndex, values: Grommet color index, default: light-1


