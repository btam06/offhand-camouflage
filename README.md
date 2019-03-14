# offhand-camouflage
Lazy loader for iframes

## Services
Services are objects that implement a match function and a getThumbnail function.  Both must be able to take the src of an iframe and be able to determine if the iframe is from a given video hosting service and how to obtain the thumbnail from that video hosting service.

The follow services are included by default:
* youtube

Services can be overwritten from the loader by adding a service object to the options object in the services array.

Example:
```
camouflage('body', { services: [{
    match: function(src) {
        [match logic]
    },

    getThumbnail: function(src) {
        [get thumbnail logic]
    }
}]});
```

## Usage
Requiring returns a loader that takes a root element to search for iframes under (body to search the whole page) and options.


### Options
| Option | Description |
| ------ | ----------- |
| services | Services is an array of translation services |
