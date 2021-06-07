## Features

Create grammars for aura cmp file syntax highlight, includes:
* aura tags
* {!expression}

## Install your extension
* Use [official guide for publishing](https://github.com/forcedotcom/salesforcedx-vscode/blob/develop/contributing/publishing.md)
* Or just replace `<user home>/.vscode/extensions/salesforce.salesforcedx-vscode-lightning-xx-xx-xx/sytaxes/html.tmLanguage.json` with `./sytaxes/html.tmLanguage.json` and restart Code.


## Colors setting
```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    // aura expression color: {!expression}
    {
      "scope": "expression.control.aura",
      "settings": {
        "foreground": "#eee786"
      }
    },
    // color of keyword in aura expression
    {
      "scope": "keyword.control.aura",
      "settings": {
        "foreground": "#c76024"
      }
    },
    // aura tags color
    {
      "scope": "tag.control.aura",
      "settings": {
        "foreground": "#b8a0f8"
      }
    }
  ]
},
```