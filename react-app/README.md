# Static Web App

This project was created to help represent a fundamental app written with React. The Shop at Home theme is used throughout the app. View it live at <https://www.shopathome.dev>.

## Learn how

Learn how to [Publish an Angular, React, Svelte, or Vue JavaScript app and API with Azure Static Web Apps](https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api/?WT.mc_id=shopathome-github-jopapa)

## Install and Setup

1. Create a repository from this template repository <https://github.com/johnpapa/shopathome/generate>

1. Enter the name of your new repository as _my-static-web-app_

1. Clone your new repository

   ```bash
   git clone https://github.com/your-github-organization/my-static-web-app
   cd my-static-web-app/react-app
   ```

1. Install the npm packages

   ```bash
   npm install
   ```

## Getting Started - Running with Static Web Apps and Serverless Functions API

1. Run the app

   ```bash
   npm run start-react-func-swa
   ```

## Getting Started - Running with Static Web Apps and Fastify API

1. Run the app

   ```bash
   npm run start-react-fastify-swa
   ```

## Authentication / Authorization

The app does not require authentication to launch or see the default page. However to view the products or discounts, the user must be authenticated using one of the options. These options are defined in the `/public/staticwebapp.config.json` file.

| Endpoint          | Roles                                         |
| ----------------- | --------------------------------------------- |
| /api/\*           | no auth                                       |
| /api/products/\*  | authenticated users                           |
| /api/discounts/\* | authenticated users with the _preferred_ role |

## Resources

### Azure Static Web Apps

- Learn how to [Publish an Angular, React, Svelte, or Vue JavaScript app and API with Azure Static Web Apps](https://docs.microsoft.com/learn/modules/publish-app-service-static-web-app-api?wt.mc_id=shopathome-github-jopapa)
- [API support in Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/apis?wt.mc_id=shopathome-github-jopapa)
- [Add an API to Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/add-api?wt.mc_id=shopathome-github-jopapa)
- [Authentication and authorization](https://docs.microsoft.com/azure/static-web-apps/authentication-authorization?wt.mc_id=shopathome-github-jopapa)
- [Routes](https://docs.microsoft.com/azure/static-web-apps/routes?wt.mc_id=shopathome-github-jopapa)
- [Review pre-production environments](https://docs.microsoft.com/azure/static-web-apps/review-publish-pull-requests?wt.mc_id=shopathome-github-jopapa)
- [Azure Free Trial](https://azure.microsoft.com/free/?wt.mc_id=shopathome-github-jopapa)
