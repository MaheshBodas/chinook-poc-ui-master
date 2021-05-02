# Chinook DB PoC
Chinook DB PoC is Front end application which consume DJango Rest API server. Its sends appropriate GET request to retrive data and uses POST request to create objects on server side.

 Here is brief introduction to functionality it offers.

1. View All Tracks screen lets user to view list of Tracks


### It makes use of following technology.
- ReactJS, Element React component library, Redmond theme from jQuery UI, FontAwesome, TypeScript, lint.
- Redux for global state store, Redux-thunk middleware.
- Axios library to communicate with server, uses token authentication.
## Demo
![demo](https://github.com/MaheshBodas/chinook-poc-ui-master/blob/master/blob/Dashboard.png)

## Build Setup

``` bash

# Clone project
git clone https://github.com/MaheshBodas/chinook-poc-ui-master.git

# Install dependencies
npm install

# serve with hot reload at localhost:9528
serve -s build

# build for production with minification
react-scripts build

# Running unit test cases
npm run test

```


## License
[MIT](https://github.com/coreui/coreui-free-react-admin-template/blob/master/LICENSE) license.
[MIT](https://github.com/MaheshBodas/chinook-poc-ui-master/LICENSE) license.

Copyright ReactJS PoC (c) 2021-present Mahesh Bodas

## File Structure

Within the download you'll find the following directories and files:

```
chinook-poc-ui-master
├── blob
│   └── Dashboard.png
├── CHANGELOG.md
├── LICENSE.md
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── _redirects
│   └── static
│       ├── images
│       │   ├── auth.jpeg
│       │   ├── avatars
│       │   │   ├── 7.jpg
│       │   │   ├── admin_office.gif
│       │   │   ├── editor.gif
│       │   │   ├── mahesh_4.jpg
│       │   │   ├── viewalltrack_bk.jpg
│       │   │   └── viewalltrack.jpg
│       │   ├── not_found.png
│       │   ├── undraw_page_not_found_su7k.svg
│       │   └── undraw_resume_folder_2_arse.svg
│       └── logo.svg
├── README.md
├── setnvm.sh
├── src
│   ├── _actions
│   │   ├── alert.actions.js
│   │   ├── authentication.actions.js
│   │   ├── index.js
│   │   ├── user.actions.js
│   │   └── viewalltracks.action.js
│   ├── api
│   │   ├── auth.js
│   │   ├── session.js
│   │   └── table.js
│   ├── App.js
│   ├── _components
│   │   ├── ComposableContainer
│   │   │   ├── card.css
│   │   │   └── ComposableContainer.tsx
│   │   ├── LoaderComponent
│   │   │   └── LoaderComponent.jsx
│   │   ├── ToggleContainer
│   │   │   ├── card.css
│   │   │   └── ToggleContainer.tsx
│   │   ├── utils.js
│   │   └── ViewTrackGrid
│   │       ├── ViewTrackGrid.css
│   │       ├── ViewTrackGrid.css.js
│   │       └── ViewTrackGrid.jsx
│   ├── components
│   │   ├── account
│   │   │   ├── AccountProfileDetails.js
│   │   │   └── AccountProfile.js
│   │   ├── DashboardLayout.js
│   │   ├── DashboardNavbar.js
│   │   ├── DashboardSidebar.js
│   │   ├── GlobalStyles.js
│   │   ├── Logo.js
│   │   ├── MainLayout.js
│   │   ├── MainNavbar.js
│   │   └── NavItem.js
│   ├── _constants
│   │   ├── alert.constants.js
│   │   ├── authentication.constants.js
│   │   ├── index.js
│   │   ├── user.constants.js
│   │   └── viewalltracks.constants.js
│   ├── _helpers
│   │   ├── auth-header.js
│   │   ├── fake-backend.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── store.js
│   ├── icons
│   │   ├── Facebook.js
│   │   └── Google.js
│   ├── _images
│   │   ├── ListLoading.gif
│   │   └── viewalltrack.jpg
│   ├── index.js
│   ├── __mocks__
│   │   └── axios.js
│   ├── pages
│   │   ├── Account.js
│   │   ├── Login.js
│   │   ├── NotFound.js
│   │   └── Register.js
│   ├── react-app-env.d.ts
│   ├── _reducers
│   │   ├── alert.reducer.js
│   │   ├── authentication.reducer.js
│   │   ├── index.js
│   │   ├── registration.reducer.js
│   │   ├── users.reducer.js
│   │   └── viewalltracks.reducer.js
│   ├── routes.js
│   ├── _services
│   │   ├── authentication.services.js
│   │   ├── index.js
│   │   ├── user.service.js
│   │   └── viewalltracks.services.js
│   ├── serviceWorker.js
│   ├── __tests__
│   │   ├── App.test.js
│   │   ├── Dashboard.test.js
│   │   ├── ToggleContainer.test.js
│   │   ├── viewalltracks.actions.test.js
│   │   └── ViewTrackGrid.test.js
│   ├── theme
│   │   ├── index.js
│   │   ├── shadows.js
│   │   └── typography.js
│   ├── themes
│   │   └── redmond│   │      
│   │       ├── jquery-ui.css
│   │       ├── jquery-ui.min.css
│   │       └── theme.css
│   ├── utils
│   │   ├── auth.js
│   │   ├── getInitials.js
│   │   └── request.js
│   └── views
│       ├── AboutMe
│       │   ├── AboutMe.css.js
│       │   ├── AboutMe.jsx
│       │   └── package.json
│       ├── Dashboard
│       │   ├── classes.js
│       │   ├── Dashboard.css.js
│       │   └── Dashboard.jsx
│       ├── Login
│       │   ├── Login.jsx
│       │   └── package.json
│       └── pages
│           ├── login
│           │   └── Login.js
│           ├── page404
│           │   └── Page404.js
│           ├── page500
│           │   └── Page500.js
│           └── register
│               └── Register.js
└── tsconfig.json

```

## Resources

- More freebies like this one: <https://devias.io>

## Reporting Issues:

- [Github Issues Page](https://github.com/devias-io/react-material-dashboard/issues?ref=devias-io)

## License

- Licensed under MIT (https://github.com/mahesh.bodas/chinook-poc-ui-master/master/LICENSE.md)

## Contact me

- Email Us: mahesh.bodas@gmail.com
