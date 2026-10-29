# GFT — Life Insurance Sales Platform

## Overview

This project began with a focused goal: let partner companies sell a single insurance product through a web application. Over time, it needed to support multiple providers, individual and corporate customers, authentication across partner systems, and reporting to a national bank.

My role grew with those requirements. After the original architecture team moved to another project, I proposed technical changes and worked with the development team to review and implement them. The central challenge was to make room for new business needs while preserving the functionality already in use.

The most valuable result was reuse across successive stages. The provider modules and dynamic forms we introduced for multiple insurers later supported corporate sales. A dedicated authentication and redirection flow handled partner entry, while a separate reporting flow extended the platform’s existing Azure infrastructure.

![Architecture overview: partners enter through SSO; Angular applications use a .NET backend on Azure Functions, with provider integrations, Cosmos DB, Key Vault and private Redis context storage. A separate flow processes contract changes and produces banking files.](images/architecture-overview.en.svg)

### How the platform works

- **Entering through a partner.** The SSO and redirect application identifies the originating partner, coordinates authentication and directs the user to the appropriate sales application.
- **Completing a sale.** Angular forms adapt to individual or corporate customers and the selected provider. The .NET backend, running on Azure Functions, applies shared rules and delegates provider-specific operations to the appropriate module.
- **Keeping data and credentials separate.** Cosmos DB stores contract information, Key Vault holds provider credentials, and Redis temporarily holds the context needed to continue a journey between applications.
- **Reporting contract changes.** A Cosmos DB trigger and Azure Function start a separate processing flow. Queued work is processed into fixed-width files for the banking reporting integration.

*The diagram shows the main responsibilities and interactions. It is a conceptual overview rather than a deployment or network topology.*

## Supporting more providers without duplicating the platform

The first version used Angular, .NET with Azure Functions, and Cosmos DB. Less than two months into the initial phase, the scope expanded to multiple insurance providers. Each brought its own integration contract, credentials, required fields and validation rules.

A form and backend designed for one product could not simply be repeated for every provider without creating more code to maintain. I proposed separating the operations common to the platform from the details that belonged to each integration.

A shared handler receives the request, identifies the provider and applies common rules. It then calls a provider module through a shared interface: a contract defining operations such as retrieving required information, submitting a request, paying and confirming. Each module implements those operations according to its provider’s API.

![Provider integration: predefined provider values feed a common resolver. A shared interface connects it to independent provider modules and APIs, with Cosmos DB for data and Key Vault for credentials.](images/provider-modules.en.svg)

The smart enum groups provider identifiers and predefined integration values; confidential credentials remain in Key Vault. On the frontend, dynamic forms replaced the original static form so that fields could adapt to the provider and business flow.

The team reviewed and implemented this approach. It gave new integrations a defined place in the system and reduced the need to duplicate shared behavior or modify unrelated provider modules.

## Carrying the customer journey safely between systems

Corporate sales introduced different fields and business rules. The earlier investment in provider modules and dynamic forms meant we could reuse that foundation. The new problem was how to bring a user from an external partner into the correct application with the information needed to continue.

That information could include the originating company, seller details and customer data used to prefill a form. Passing it directly in a public URL would expose information that belonged in controlled backend communication.

I proposed a dedicated SSO integration and redirect handler, supported by separate frontend and backend applications. After resolving authentication and partner context, it stored the context temporarily in Redis within a private network. The browser received a reference key. The destination backend used that key, its own credentials and authorization checks to retrieve the information.

This gave the applications a shared entry and context-resolution flow, rather than requiring each one to handle partner authentication and redirection independently.

## Turning contract changes into consistent banking reports

The next integration required sending the bank information about confirmed, validated and cancelled contracts. We extended the Azure-based system with a Cosmos DB trigger and Azure Function, keeping this reporting work separate from the main sales flow.

The difficult part was the file contract. In a fixed-width file, each field must occupy an exact position and length. Formatting a value correctly can require padding, truncation, numeric conversion or accent removal. Weekly and monthly files also needed to represent related contract information consistently, even when generated at different times.

I proposed and implemented a dedicated formatting module, applying DDD principles to keep these rules together. Shared transformations could be reused, while each file layout retained its specific requirements. This made the formatting logic easier to reason about than rules scattered throughout the integration workflow.

Correctness depended on both levels: each field had to satisfy its specification, and related files had to agree about the underlying contract data.

## What this project demonstrates

The banking integration was delivered, and the institution requested technical documentation as a reference for other companies. The team was also invited to explain the architecture and implementation approach.

For me, the lasting lesson was how architectural decisions compound. Separating provider-specific work helped us accommodate corporate sales later; isolating authentication and reporting gave each flow a clear responsibility. My contribution combined hands-on implementation with proposing those boundaries and reaching agreement with the team on how to build them.

### Icon credits

Azure Functions, Cosmos DB and Key Vault icons: [Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/icons/). Official product colors are preserved. Generic components are shown without implying a specific cloud product.
