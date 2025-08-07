# MMM-AddressBook
This is a module to display an Address Book type listing.  It can be used as a simple address book or for any sort of data that can be fit into such a layout.

I (Uncle Roger) use it for:
* Immediate Family (Addresses, Phone Numbers, E-mail addresses)
* Extended Famliy
* Medical Providers (Doctors, Dentists, etc., in case of emergency)
* Medicines taken (again, in case of emergency)
* Travel Memberships (Hotel, airline, rental car info)
* Subscriptions (login info, websites, etc. for Netflix, Britbox, Spotify, etc.)
* Utilities (Contact info, account numbers)
* Political Representatives (Contact info to try and stem the rise of fascism)

The possibilities, however, are endless.

## How to use
1. Clone this repo into your Magic Mirrors modules directory with the following command:
```bash
cd ~/MagicMirror/modules
git clone https://github.com/Unclearogre/MMM-AddressBook.git
```
.
2. Update your Magic Mirror Config to setup a Module Instance.  See the configuration options and examples below.

## Instance Definition

For each address book, create a separate module instance.  In the config section, there are a few options that apply to the entire instance, such as the number of columns and spacing before and after the module, as well as the definition of elements and, of course, the data.  Elements are items such as name, address, phone number, website, etc.  These are entirely user defined.

The elements property contains a array of elements, each of which consists of a name and a format.  The format is a list of one or more formatting options, separated by commas.  For example, the element "Name" might be specified as:
```
{ name: 'Name',        format: { indented: true, bold: true } },
```
indicating that it should be indented and bold.

Entries is an array of element/value pairs.  Not all elements are required; for example, there might be an element for "Fax Number" but many entries might not have one.  That's perfectly acceptable.


## Configuration Options

### Module Config Options
| Option | Description |
|---|---|
| numColumns | Sets the number of columns the AddressBook will be split into |
| columnGap | Sets the spacing between columns |
| spaceAfter | Sets blank space after the module |
| spaceBefore | Sets blank space before the module |
| elements | Defines the elements of an address entry and their formatting |
| entries | Defines actual data to be displayed |

### Element Definition
| Option | Description |
|---|---|
| name | The name of the data field |
| format | Formatting options for this field |

### Element Formatting Options
| Option | Values | Description |
|---|---|---|
| prefix: | '<text>' | Defines text to be prepended to the data |
| suffix: | '<text>' | Defines text to be appended to the data |
| <format>: | true | Identifies CSS formatting to be applied to this entry. Multiple formats can be applied. |

#### Supported Element Formats
* bold
* italic
* colored
* underline
* indented


## Adding new formats

Additional formats can be added in the css file to layout your entries however you like.  To define and use a new format, follow these steps:

1. add formatClassMap entry in :root definition:
```
   --formatClassMap-<format>: <selector>;
```
2) add format class using the <selector> added to the :root definition:
```
.<selector> {
    property: value;
}
```
3) in config.js, in the MMM-AddressBook definition, add the format to the entry you want it to apply to:
```
                { name: 'Location',    format: { <format>: true, } },
```

### New format example
```
:root {
[ ... ]
    --formatClassMap-location: location;
[ ... ]
}

[ ... ]

.location {
    margin-top:  6px;
}
```

## Sample Configuration
```
        {
            module: 'MMM-AddressBook',
            position: 'top_left',
            header: 'United States House of Representatives',
            config: {
                numColumns: 1,
                columnGap: '10px',
                elements: [  
                    { name: 'State', format: { bold: true } },
                    { name: 'Name',        format: { indented: true, bold: true } },
                    { name: 'Email',       format: { subentry: true, } },
                    { name: 'WebSite',     format: { subentry: true, } },
                    { name: 'Location',    format: { subentry: true, underline: true, location: true, } },
                    { name: 'Address1',    format: { subentry: true, } },
                    { name: 'Address2',    format: { subentry: true, } },
                    { name: 'Address3',    format: { subentry: true, } },
                    { name: 'Address4',    format: { subentry: true, } },
                    { name: 'Phone',       format: { subentry: true, } },
                    { name: 'Fax',         format: { subentry: true, suffix: ' (Fax)' } },
                ],
                entries: [
                    {
                        'State':        '11th District - California',
                        'Name':         'Nancy Pelosi (D)',
                        'Email':        '',
                        'WebSite':      'https://pelosi.house.gov',
                        'Location':     'Washington DC Office',
                        'Address1':     '1236 Longworth H.O.B.',
                        'Address2':     'Washington, DC  20515',
                        'Address3':     '',
                        'Address4':     '',
                        'Phone':        '1.202.225.4965',
                        'Fax':          '',
                    },
                ]
            },
	},
```
<img width="385" height="263" alt="MMM-AddressBook - Sample 1" src="https://github.com/user-attachments/assets/7b746f38-7a4a-4cb3-9bb3-7bc4f112f7d4" />
