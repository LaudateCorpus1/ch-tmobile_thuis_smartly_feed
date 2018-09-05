# ch-tmobile_thuis_smartly_feed

Works just like the https://ghg-smartly-lemonpi-api.herokuapp.com/ api but extends the propositions with parsed JSON data from given fields.

Use the same parameters as you would using the https://ghg-smartly-lemonpi-api.herokuapp.com/.

### URL example:

An example API request would look something like https://ch-tmobile-thuis-smartly-feed.herokuapp.com/propositions?advertiser=190&dynamicInputId=2721&agency=FFD&days=1&size=100&fieldsToFlatten=description

### Flatten multiple fields
In case you want more fields to be parsed and extended to the proposition, provide the parameter `fieldsToFlatten` with multiple field names, separated by comma's. E.g. `fieldsToFlatten=description,title,custom1`.  
