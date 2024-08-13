# About the Shop at Home app

The [Shop at Home app](https://www.shopathome.dev) allows customers to securely add, edit, view, and remove items such as food and household needs from their list. This sample is designed to help you learn how to build and deploy a FullStack project on [Azure App Spaces](https://learn.microsoft.com/en-us/azure/app-spaces/overview). The frontend is developed with four different JavaScript frameworks/libraries, allowing you to select the one that best suits your preferences and requirements.

- The Frontend is built using 4 JavaScript frameworks (Angular, React, Svelte, Vue) and is deployed to **Azure Static Web Apps**
- The Backend server running on Fastify is deployed to **Azure Container Apps**

## Run Shop at Home locally

### Prerequisites

- A GitHub account
- [Node.js and Git](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=academic-0000-jopapa) installed
- The [SWA CLI](https://www.npmjs.com/package/@azure/static-web-apps-cli) installed
- The [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local?WT.mc_id=academic-0000-jopapa) installed

See instructions to install, setup and run the application locally in the **README.md** file located at the root of the respective folders.

| Folder          | Description                                                                          | Live Demo                                                |
| --------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| **angular-app** | [Sample Angular app](https://github.com/johnpapa/shopathome/blob/master/angular-app) | [angular.shopathome.dev](https://angular.shopathome.dev) |
| **api**         | [Fastify API](https://github.com/johnpapa/shopathome/blob/master/api) | protected                                                |
| **react-app**   | [Sample React app](https://github.com/johnpapa/shopathome/blob/master/react-app)     | [react.shopathome.dev](https://react.shopathome.dev)     |
| **svelte-app**  | [Sample Svelte app](https://github.com/johnpapa/shopathome/blob/master/svelte-app)   | [svelte.shopathome.dev](https://svelte.shopathome.dev)   |
| **vue-app**     | [Sample Vue app](https://github.com/johnpapa/shopathome/blob/master/vue-app)         | [vue.shopathome.dev](https://vue.shopathome.dev)         |

## Deploy to Azure using App Spaces

[![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#view/Microsoft_Azure_PaasServerless/StarshotHome.ReactView)

1. Once you are signed in on Azure through the link above,
    - *For New Users:* under **Create new App Space**, you'll access the template gallery and choose a shopping app solution template based on your preferred framework.
    - *For Existing Users:* on the page displaying your existing app spaces, Click **Create App Space** to access the template gallery and choose a shopping app solution template based on your preferred framework.
1. Fill in the required information:

    - *GitHub account* – Connect to your GitHub Account.
    - *Organization* – Choose your organization.
    - *New Repository* – This will be automatically populated with a fork that's created on your account.
    - *App Space name* – Give your App Space a name (or use the default).
    - *Subscription* – Choose your subscription.
    - *Region* – Choose an Azure region.
  
1. Click **Deploy**

Once your App Space is provisioned successfully, open to view your frontend deployed on Azure Static Web Apps with a link to **Open app in browser**.

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/shopathome/issues)

## Learn More

- Complete the [Introduction to App Spaces Learn Module](https://review.learn.microsoft.com/en-us/training/modules/introduction-code-to-cloud/?branch=pr-en-us-45512) to learn how App Spaces works by simplifying the deployment and management of multiple services in the Azure Portal.
- Check out the [Documentation](https://learn.microsoft.com/en-us/azure/app-spaces/overview)
- [Learn about Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) - A service optimized for hosting static web content.
- [Learn more about Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) - A service optimized to to simplify the running of containers backed by the power of Kubernetes.
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=academic-0000-jopapa)
