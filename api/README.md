# Azure Functions API

This project is an Azure Functions app, that responds to GET, POST, PUT, and DELETE endpoints for products.

## Learn how

Learn how to [Publish an Angular, React, Svelte, or Vue JavaScript app and API with Azure Static Web Apps](https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api/?WT.mc_id=shopathome-github-jopapa)

## Getting Started

1. Create a repository from this template repository <https://github.com/johnpapa/shopathome/generate>

1. Enter the name of your new repository as _mslearn-staticwebapp_

1. Clone your new repository

   ```bash
   git clone https://github.com/your-github-organization/mslearn-staticwebapp
   cd mslearn-staticwebapp/api
   ```

1. Create the file `api/local.setting.json` and modify its contents as follows:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "CORS": "http://localhost:3000,http://localhost:4200,http://localhost:5000,http://localhost:8080"
  }
}
```

1. Run the app

   ```bash
   npm start
   ```

## Resources

- [Azure Free Trial](https://azure.microsoft.com/en-us/free/?wt.mc_id=mslearn_shopathome-github-jopapa)
- [VS Code](https://code.visualstudio.com?wt.mc_id=mslearn_shopathome-github-jopapa)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=mslearn_shopathome-github-jopapa)
- Azure Functions [local.settings.json](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#local-settings-file?WT.mc_id=mslearn_shopathome-github-jopapa) file

### Debugging Resources

- [Debugging Angular in VS Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial?wt.mc_id=mslearn_shopathome-github-jopapa)
- [Debugging React in VS Code](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial?wt.mc_id=mslearn_shopathome-github-jopapa)
- [Debugging Vue in VS Code](https://code.visualstudio.com/docs/nodejs/vuejs-tutorial?wt.mc_id=mslearn_shopathome-github-jopapa)
