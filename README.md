## Important note about the Syntax

For this service to be an opensource project and work properly as it is supposed to, every other service needs to follow the standard that is provided by Koalament. This is a requirement that other services and developers have to comply with.

## Layers

Layers specify the rest of the OP_RETURN, you can look at the layers as the version number. Each layer has method(s) and a data structure with required parameters associated with the method. The methods are used to parse and generate the message.The message structure may change in different layers depending on the new features. These layers interpret the messages to other layers so all the messages can be readable by all the extensions. Currently, there is only one layer in Koalament.


## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install koalament-layers
```