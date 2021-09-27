# Chocoflask
A CDE (Content Delivery Engine) created in Node.js that serves images, videos, static pages, and any other static file that you can imagine.

## Features
- Static file server (images, videos, HTML, binaries, anything that does not need a dynamic server), built right into Chocoflask
  
- [**PLANNED**] support for remote file storage (Amazon S3, FTP, etc.)
  
- A component system, allowing Chocoflask to be extended with new features and custom functionality
  
- A dynamic information system that reads from the `files/main` directory, with a `files/misc` directory for files that need to be sorted away from `files/main`

- A JSON-based REST API, designed for use in programs like ShareX and Sharenix. Sharenix and ShareX configurations are available in `examples/`
  
- [**PLANNED**] support for IFTTT and Discord (webhooks).
  
## Installation
Installing is as simple as:

- cloning the repository 
  
- running `yarn install` (or `npm install`, depending on what tickles your fancy)
  
- copying Config.example.js to Config.js and then configuring it referencing the notes in the configuration
  
- loading Chocoflask using `node .` or `node src/chocoflask` (yes, the Chocoflask/Chococore entrypoint does NOT have a .js extension, but Node.js will **still recognise it as JavaScript**).

- (Optional) modifying the chocoflask.service to include your chocoflask location

- (Optional) copying chocoflask.service to `/lib/systemd/system` and enabling it with `systemctl enable --now chocoflask`

## Creating components
Creating a Chocoflask component is as simple as creating a new folder inside of `src/components` (or creating a new repository using your favourite version control system) and writing a manifest.json file inside of it. Below is an example of a manifest.json file:

```json
{
    "name": "CDE Component",
    "version": "1.0.2",
    "entrypoint": "index.js"
}
```

To describe the manifest:

- The name property is the display name that will be shown when Chococore is loading components, and can also be used for referencing components in other modules. If this property is not specified, the name will be defaulted to the name of the directory.
  
- The version of pretty self explanatory - the version of the module. If this propery is not specified, the version will be defaulted to the Chocoflask version.

- The entry point is the file that will be loaded when Chococore loads the component. If this property is not specified, Chococore will skip loading the component.

## Why is it called "Chocoflask"?
For the "Choco" part of the name, I think I was thinking of names and I kind of thought of Chocolatey? As for "Flask", a flask is a container of liquid which is a perfect analogy for this project; just like how a flask will usually hold a mixture of liquids, Chocoflask contains different mixtures of components and a different set of files for every instance of the Chocoflask CDE.
