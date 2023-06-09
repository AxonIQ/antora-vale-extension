# Antora Vale.sh Extension

[Vale.sh](https://vale.sh/) helps you maintain a consistent and on-brand voice by allowing you to create your own custom rules.
This extension runs Vale.sh during the build process. The build will fail if it finds any errors.

## Prerequisites

You must use at least Node.js 16 and Antora 3 to use this extension.
You also need Vale installed and accessible on the machine you run the build.

## Installation

Installing the extension package into your [playbook project](https://docs.antora.org/antora/3.0/playbook/use-an-existing-playbook-project/):

```console
$ npm i @axoniq/antora-vale-extension
```

You also have the option of installing the extension globally by adding the `-g` flag to the `npm i` command:

```console
$ npm i -g @axoniq/antora-vale-extension
```

## Register the extension

You need to [register the extension](https://docs.antora.org/antora/3.0/extend/register-extension/) with Antora before it can use it.
Open the Antora playbook file and add the extension as follows:

**antora-playbook.yml**

```yaml
antora:
  extensions:
  - id: vale
    require: '@axoniq/antora-vale-extension'
    enabled: true
    vale_config: .vale.ini
    update_styles: true
```

 - The `vale_config` parameter specifies where Vale’s configuration is read from.
- The `update_styles` boolean parameter dictates if remote styles should be updated (effectively running `vale sync`) before the build.

