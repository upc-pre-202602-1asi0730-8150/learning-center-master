# ACME Learning Center Application (`learning-center`)

## Overview
`learning-center` is an Angular 22 client application for managing learning information in the ACME Learning Center domain. The current implementation focuses on maintaining categories and courses, with the codebase organized around Domain-Driven Design (DDD) bounded contexts and layered responsibilities.

In development mode, the application consumes a local fake API exposed through `json-server`. The frontend is configured to call `http://localhost:3000/api/v1` for learning resources.


# UrbanFit Sports Center Management Platform

## Overview

Web application for UrbanFit Sports Centers to manage reservations, check the current weather
and monitor the capacity of each sports center.

## Authorship

- **Author:** Roberto Gonzales Ayala
- **Student code:** u202113310
- **Course:** Desarrollo de Aplicaciones Open Source (1ASI0729) - NRC 7737
- **Repository:** <https://github.com/USER/REPOSITORY>

## Features

- Toolbar with custom logo, platform title and EN/ES language switcher.
- Sidenav (Angular Material) with "Home" and "New Reservation".
- Home: "My Sports Centers" grid with one summary card per center
  (participants per reservation, Total Participants and Available Capacity).
- New Reservation: reactive form with validation. The weather temperature is
  retrieved automatically from Open-Meteo for the selected sports center.
- Capacity rule: participants must be greater than 0 and not exceed the available
  capacity. Capacity is recalculated from fresh data right before saving.
- If the weather cannot be retrieved, the reservation cannot be created.
- Page not found view and redirect from `/` to `/home`.
- English (default) and Spanish interface, with ARIA attributes.

## Tech Stack

Angular, TypeScript, Angular Material, Angular Signals, Angular Router,
HttpClient, ngx-translate, json-server 0.17.4 (fake API) and Open-Meteo (external API).

## Architecture

Domain-driven, layered and component-based. Bounded contexts: `shared`,
`sports-centers` and `weather`. Each one is organized in `domain`, `application`,
`infrastructure` and `presentation` (`views` and `components`).
Patterns: Request/Response, Resource, Assembler, Api, Endpoint and Store.

## Configuration

1. Install dependencies: `npm install`
2. Start the fake API: `cd server` and `json-server --watch db.json` (port 3000)
3. Start the application: `ng serve` and open <http://localhost:4200>

URLs and endpoint paths are defined in `src/environments/environment.ts`.
