/*==============================================================*
 *																*
 * Module Name: MMM-AddressBook									*
 * Author:		Roger Sinasohn									*
 * Date:		2025-07-31										*
 * Description:	Creates an address book type display with		*
 *				multiple levels and formatting options.			*
 *																*
 * Change Log													*
 * ----------													*
 * 2025-07-31  RLS  Initial Update.								*
 *																*
 *==============================================================*/

Module.register('MMM-AddressBook', {

start: function() {
    this.sendSocketNotification('CONFIG', this.config);

    console.log('************************');
	console.log(this.name + ' is started!');
    console.log('************************');
},

  getStyles: function () {
    let css = ['MMM-AddressBook.css']
    console.log("***** css: " + css);
    return css
  },


    defaults: {
        numColumns:  2,
        columnGap:   '10px',
        spaceAfter:  '10px',
        spaceBefore: '0px',
    },







socketNotificationReceived: function (notification, payload) {
    if (notification === 'CONFIG') {
//console.log("***** Config Payload: ", payload);
        this.config = payload;
        this.updateDom();
    }
},





formatValue: function(value, format) {
    let formattedValue = value;

    if (format.prefix) {
        formattedValue = `${format.prefix}${formattedValue}`;
    }
    if (format.suffix) {
        formattedValue = `${formattedValue}${format.suffix}`;
    }


    Object.entries(format).forEach(([key, value]) => {
        if (value && getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`)) {
            const className = typeof value === 'string' ? `${getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`)}${value}` : getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`);
            formattedValue = `<span class="${className}">${formattedValue}</span>`;
        }
    });
    formattedValue = `<span style="text-align: left;">${formattedValue}</span>`;
    return formattedValue;
},

formatClasses: function(format) {
    const classes = ['.left-aligned']; // Default left-aligned class
    Object.keys(format).forEach(key => {
        if (format[key] && getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`)) {
            const className = typeof format[key] === 'string' ? `${getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`)}${format[key]}` : getComputedStyle(document.documentElement).getPropertyValue(`--formatClassMap-${key}`);
            classes.push(className);
        }
    });
    return classes.join(' ');
},




// Production Version - 20240408
getDom: function() {
    var wrapper = document.createElement('div');
    wrapper.className = 'directory-entries'; 

		console.log("Starting MMM-AddressBook - " + this.name);
	
//    wrapper.style.setProperty('--numColumns', this.config.numColumns);
//    wrapper.style.setProperty('--columnGap', this.config.columnGap);
    wrapper.style.setProperty('column-count', this.config.numColumns);
    wrapper.style.setProperty('column-gap',   this.config.columnGap);
    
//		console.log("******* Variables - numColumns: " + this.config.numColumns);
//		console.log("******* Variables - columnGap:  " + this.config.columnGap);

    this.config.entries.forEach(entry => {
        var entryWrapper = document.createElement('div');
        entryWrapper.className = 'directory-entry-wrapper'; 
        
        entryWrapper.style.marginBottom = this.config.spaceBefore; 
        entryWrapper.style.marginBottom = this.config.spaceAfter; 
        
        this.config.elements.forEach(element => {
            var value = entry[element.name] || '';
            if (value !== '') {
                var formattedValue = this.formatValue(value, element.format);
                var entryElement = document.createElement('div');
                entryElement.className = 'MMM-AddressBook ' + this.formatClasses(element.format);
                entryElement.innerHTML = formattedValue;
                entryWrapper.appendChild(entryElement);
            }
        });
        wrapper.appendChild(entryWrapper);
    });

    return wrapper;
},






});






































