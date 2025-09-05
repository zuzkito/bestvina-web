
![Logo](https://github.com/FelyCZ/bestvina-web/blob/ba0e74697893461b7fb1fffd61283d9a7f2add47/public/imgs/bestvina_logo.png?raw=true)


# Běstvina Website

Repository containing source code of official website for summer camp Běstvina.

Website will be available at [bestvina.cz](https://bestvina.cz/).


## Tech Stack

**Client:** Nuxt v4, TailwindCSS
* modules:
    - NuxtUI Pro Library [`@nuxt/ui-pro`]
    - Nuxt Content [`@nuxt/content`] for generating some pages
    - Nuxt Image [`@nuxt/image`] for image optimization
    - ESLint [`@nuxt/eslint`] for linting

**Server:** Bun, Nitro


## Installation

### 1. Prerequisites
The repository is configured to be used in either [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/).
```powershell
winget install -e --id Microsoft.VisualStudioCode
```

Make sure you have installed [Bun](https://bun.com/), or any other runtime and package manager of choice.
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. Repository
Clone the repository:
```powershell
git clone git@github.com:FelyCZ/bestvina-web.git
cd bestvina-web
``` 

### 3. Dependencies
Make sure to install dependencies:
```powershell
bun install
```

### 4. Development server
Start the development server on `http://localhost:3000`:
```powershell
bun run dev

# if you want to open a new tab automatically, include -o parameter
bun run dev -o
```

### 5. Linting
To find any problems use:
```powershell
bun run lint
```

To automatically fix problems run:
```powershell
bun run lint:fix
```

### 6. Production build
Build the application for production:
```powershell
bun run build
```

If you want to preview the production build:
```powershell
bun run preivew
```
## Documentation

### Add a new year
Change `CURRENT_YEAR` constant in `shared/constants.ts`:
```typescript
export const CURRENT_YEAR = <new year value>;
```

Create a new file `content/rocniky/<new year>.yml`:
```yml
seo:
  title: Ročník <new year value>
  description: Historie Běstviny z roku <new year value>
  meta: 
  link:
title: <new year value>
description: Historie Běstviny z roku <new year value>
year: <new year value>
coverImg: /imgs/rocniky/<new year value>/cover.jpg
theme:
```
Replace all `<new year value>` with the year. Keep the `theme` empty since the camp is not year over.

Select one nice-looking photo from the ***current*** year and upload it to folder `public/imgs/rocniky/<current year value>/` named as `cover.jpg`.

Update current year's content file `content/rocniky/<current year>.yml` by adding a theme variable:
```yml
(...)
theme: <current year's theme>
```

## Authors

- Jakub Ferenčík ([@FelyCZ](https://www.github.com/FelyCZ))


## Credits

 - Michal H. Kolář - for previous website source code

