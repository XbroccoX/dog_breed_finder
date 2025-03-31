# DogBreedFinder

DogBreedFinder es una aplicación Angular (standalone) que permite explorar imágenes de razas de perros usando la API de [Dog CEO](https://dog.ceo/dog-api/). La aplicación implementa las siguientes funcionalidades:

- **Búsqueda por Raza:**  
  Permite buscar y explorar imágenes de perros de acuerdo a la raza (y sub-raza, si aplica).

- **Vista en Grid con Diseño Minimalista:**  
  La visualización de las imágenes se realiza en tarjetas (cards) utilizando clases de Bootstrap para definir una grid responsiva, con aspect ratio fijo e imágenes que se ajustan (object-fit: contain).

- **Favoritos con Estado Reactivo:**  
  Se usa RxJS para manejar el estado de los perros favoritos en memoria (a través de un BehaviorSubject) en lugar de localStorage. Se pueden agregar y remover imágenes de favoritos y se visualizan en la página "My Favorites" en tiempo real.

- **Botón "Sorpréndeme":**  
  Al hacer clic en este botón se obtiene una imagen aleatoria llamando al endpoint `/breeds/image/random` de la API, la cual se muestra como una sorpresa para el usuario.

- **Integración y Navegación:**  
  La aplicación cuenta con un sistema de routing standalone. Las rutas disponibles son, por ejemplo, la vista general de las imágenes (`/dogs-cards` o búsqueda) y la vista de favoritos (`/favorites`).

## Requisitos

- Node.js y npm instalados.
- Angular CLI versión 18 o superior.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# dog_breed_finder
# dog_breed_finder
