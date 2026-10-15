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



<br>
<br>
<br>

# Orden de desarrollo - UrbanFit (Angular)

Un commit por paso. Después de cada paso la app debe compilar.

1. **Proyecto y API**
  - `ng new`, `ng add @angular/material`, instalar ngx-translate y `json-server@0.17.4`, `ng generate environments`.
  - `server/db.json`, script `api`, URLs en `environment.ts`, tema, logo propio.
  - Carpetas: `shared`, `sports-centers`, `weather` (cada una con `domain`, `application`, `infrastructure`, `presentation`).

2. **Layout y rutas**
  - `ng g c` de `layout`, `home`, `new-reservation`.
  - Toolbar (logo, título), sidenav, `router-outlet`.
  - Rutas: `home`, `reservations/new` (hija), `''` → `home`.

3. **i18n**
  - `en.json` y `es.json` en `public/assets/i18n/`.
  - `app.config.ts`: `provideHttpClient` y `provideTranslateService`.
  - `language-switcher` (EN/ES) y pipe `translate` en las vistas.

4. **Page not found**
  - Muestra la ruta no encontrada y botón a Home.
  - Ruta `**` al final.

5. **sports-centers: datos y cards**
  - `shared`: `base-assembler`, `base-api-endpoint`.
  - Dominio: `activity-type`, `sports-center`, `reservation`, `sports-center-occupancy`.
  - Infraestructura: resources, responses, assemblers, endpoints, api.
  - Store con signals (`occupancies`, `loadAll`).
  - Componentes `sports-center-summary` y `my-sports-centers` (grid de 2 columnas) en Home.

6. **weather**
  - Entidad, resource, response, assembler, endpoint, api, store.
  - En `new-reservation`: select de actividad → pide el clima con las coordenadas del centro.

7. **Formulario y creación**
  - `reservation-draft`, `capacity-exceeded.error`, `create-reservation.request`.
  - Store: re-consulta reservas → recalcula capacidad → POST.
  - Validaciones; Create bloqueado sin clima válido; Create → `/home` solo si guardó; Cancel → `/home`.

8. **Cierre**
  - README en inglés con Authorship y URL del repo.
  - TSDoc (`@summary`, `@author`) en todos los `.ts`.
  - ARIA, logo propio, sin `node_modules`, zip `ea<nrc>u<código>.zip`.

**Errores frecuentes:** `styleUrl` con la extensión real (`.css`/`.scss`), archivos en `public/assets/`, reiniciar `ng serve` al tocar `public` o `angular.json`, `TranslatePipe` en cada componente que traduce, dos terminales (`npm run api` y `ng serve`).
