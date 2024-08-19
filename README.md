# About the Shop at Home app

The [Shop at Home app](https://www.shopathome.dev) allows customers to securely add, edit, view, and remove items such as food and household needs from their list. 

This repository contains apps that can be used with as a starting point for some MS Learn Modules. because everyone has their own preference for their JavaScript frameworks/library, you can choose which one best suits your preferences and requirements.

- The Frontend is built using 4 JavaScript frameworks (Angular, React, Svelte, Vue) and is deployed to **Azure Static Web Apps**
- The sample contains 2 APIs you can choose from: An **Azure Functions App** and a Fastify server project which is deployed to **Azure Container Apps**

## Run Shop at Home locally

### Prerequisites

- A GitHub account
- [Node.js and Git](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=academic-0000-jopapa) installed
- The [SWA CLI](https://www.npmjs.com/package/@azure/static-web-apps-cli) installed
- The [Static Web Apps extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps&WT.mc_id=shopathome-github-jopapa&WT.mc_id=academic-0000-jopapa) installed
- The [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local?WT.mc_id=academic-0000-jopapa) installed

See instructions to install, setup and run the application locally in the **README.md** file located at the root of the respective folders.

| Folder          | Description                                                                          | Live Demo                                                |
| --------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| **angular-app** | [Sample Angular app](https://github.com/johnpapa/shopathome/blob/master/angular-app) | [angular.shopathome.dev](https://angular.shopathome.dev) |
| **api**         | [Sample Azure Functions app](https://github.com/johnpapa/shopathome/blob/master/api) | protected                                                |
| **api**         | [Sample Fastify API](https://github.com/johnpapa/shopathome/blob/master/fastify-api-server) | protected                                                |
| **react-app**   | [Sample React app](https://github.com/johnpapa/shopathome/blob/master/react-app)     | [react.shopathome.dev](https://react.shopathome.dev)     |
| **svelte-app**  | [Sample Svelte app](https://github.com/johnpapa/shopathome/blob/master/svelte-app)   | [svelte.shopathome.dev](https://svelte.shopathome.dev)   |
| **vue-app**     | [Sample Vue app](https://github.com/johnpapa/shopathome/blob/master/vue-app)         | [vue.shopathome.dev](https://vue.shopathome.dev)         |

## Deploy to Azure using Azure Static Web Apps (Azure Functions API)
[![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/?feature.customportal=false&WT.mc_id=academic-0000-jopapa#create/Microsoft.StaticApp)

## Deploy to Azure using App Spaces (Fastify API)

[![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#view/Microsoft_Azure_PaasServerless/StarshotHome.ReactView)

1. Once you are signed in on Azure through the link above,
    - *For New Users:* Clicking the button above will take you to the App Space template gallery. Select a shopping app solution template based on your preferred framework.
    - *For Existing Users:* Clicking the button above will direct you to a page displaying your existing app spaces and a ‘Create App Space’ button. Click ‘Create App Space’ to access the template gallery and choose a shopping app solution template.


    - GitHub Login: Log in to your GitHub account and fill in your organization and other required fields on the form:
        - *GitHub account* – Connect to your GitHub Account.
        - *Organization* – Choose your organization.
        - *New Repository* – This will be automatically populated with a fork that's created on your account.
        - *App Space name* – Give your App Space a name (or use the default).
        - *Subscription* – Choose your subscription.
        - *Region* – Choose an Azure region.

    - Deployment: Click ‘Deploy’ to view the deployment progress.
    - Post-Deployment: After deployment is complete, you will be redirected to your app space for management.


     Since your frontend is already linked to the backend, to view your API, authentiate on the App through GitHub or Entra ID and the call will be securely proxied via */api/* path. Ie. Use the route */api/products* to see product data

## Learn how

Learn how to [Publish an Angular, React, Svelte, or Vue JavaScript app and API with Azure Static Web Apps](https://docs.microsoft.com/learn/modules/publish-app-service-static-web-app-api/?WT.mc_id=academic-0000-jopapa)

<!-- ADD ONCE MODULE IS LIVE -->
<!-- - Learn how to [Simplify deployment and management of web apps with App Spaces](https://aka.ms/AppSpaces/module) -->

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/shopathome/issues)

## Learn More
- Learn how to [set up local development for Azure Static Web Apps using SWA CLI](https://docs.microsoft.com/en-gb/azure/static-web-apps/local-development?WT.mc_id=academic-0000-jopapa)
  - Learn more about [SWA CLI](https://github.com/Azure/static-web-apps-cli#readme?WT.mc_id=academic-0000-jopapa)
- [Learn about Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/overview)
- [Authenticate and authorize Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/authentication-authorization?WT.mc_id=academic-0000-jopapa)
- [Add an API to Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/add-api?WT.mc_id=academic-0000-jopapa)
- [API support in Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/apis?WT.mc_id=academic-0000-jopapa)
- [Routes](https://docs.microsoft.com/azure/static-web-apps/routes?WT.mc_id=academic-0000-jopapa)
- [Review pre-production environments](https://docs.microsoft.com/azure/static-web-apps/review-publish-pull-requests?WT.mc_id=academic-0000-jopapa)

- [Learn about App Spaces](https://learn.microsoft.com/en-us/azure/app-spaces/overview) 
- [Learn more about Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) 
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=academic-0000-jopapa)
