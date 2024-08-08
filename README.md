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

## Run Shop at Home on Azure 
> [!NOTE]
> Ensure you fork the project to your GitHub account before you start deploying.

[![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#view/Microsoft_Azure_PaasServerless/StarshotTemplateGallery.ReactView)

1. Once you are signed in on Azure, under **Create new App Space**, select the **Deploy code from your GitHub repository** option
1. Fill in the required information:

    - *GitHub account* – Connect to your GitHub Account.
    - *Organization* – Choose your organization.
    - *Repository* – Select the shopathome repository from the dropdown.
    - *Branch* – Choose a branch.
    - *App Location* – Location of the application code in your repository. Choose a location depending on your framework of choice (./react-app, ./svelte-app, ./vue-app, ./angular-app).
    - *App Space name* – Give your App Space resource a name.
    - *Subscription* – Choose your subscription.
    - *Region* – Choose an Azure region.
  
1. Click **Deploy**

Once your App Space is provisioned successfully, open it to see your frontend component, and click on the link **Open app in browser** to view the frontend app on Azure Static Web Apps.

<!--- See [the full tutorial](https://review.learn.microsoft.com/en-us/training/modules/introduction-code-to-cloud/4-exercise-deploy-fullstack-app-from-github?branch=pr-en-us-45512) to deploy your frontend. -->

To add your backend:
1. Open your App Space, click on **+ Add Component** and select **GitHub Repository**
1. Fill in the required information as shown in the previous step to connect to your repository. For *App Location*, select ./fastify-api-server
1. Issue a *Listening Port*: 3000
1. Give your component a name *Ie. ShopAtHome-Backend*
1. Add component, then **Deploy**

> [!NOTE]
> To enable API connection and link the backend component to your Static App, click the connection between your frontend and backend, then **Upgrade + connect** 

Once your App Component (Backend) is added successfully, refresh your App Space to view your backend deployed on Azure Container Apps with a link to **Open app in browser**.

<!-- See [the full tutorial](https://review.learn.microsoft.com/en-us/training/modules/introduction-code-to-cloud/4-exercise-deploy-fullstack-app-from-github?branch=pr-en-us-45512) to add your backend. -->

## Problems or Suggestions

[Open an issue here](https://github.com/johnpapa/shopathome/issues)

## Learn More

To learn more about the end-to-end of how this application was built, you can learn more in the [walkthrough](#).

Other references:
<!-- - Complete the [Introduction to App Spaces Learn Module](https://review.learn.microsoft.com/en-us/training/modules/introduction-code-to-cloud/?branch=pr-en-us-45512) to learn how to Deploy an Angular, React, Svelte, or Vue JavaScript app and Fastify API with Azure App Spaces -->
- [Learn about App Spaces](https://learn.microsoft.com/en-us/azure/app-spaces/overview) - Simplifies the deployment and management of multiple services in the Azure Portal
- [Learn about Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) - A service optimized for hosting static web content.
- [Learn more about Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) - A service optimized to to simplify the running of containers backed by the power of Kubernetes.
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=academic-0000-jopapa)
