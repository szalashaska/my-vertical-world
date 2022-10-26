# My vertical world - platform for climbers

Browser based platform for climbers created with Django on the backend (REST Framework) and React on the frontend. With use of Canvas API lets you draw climbing route path on the wall image and than add its location on map provided by OpenLayers API. Frontend styling with Styled Components.

## Table of contents

- [Video Demo](#video-demo)
- [Description](#description)
- [Technologies](#technologies)
- [Features](#features)
- [Files](#files)
- [Setup](#setup)

## Video Demo <URL: https://>

## Description

This is a final project for Harvard's CS50 Web Programming with Python and JavaScript course. My goal was to use new learned technologies, memorize the material from course and have fun while doing it.

One of my passions is climbing. I often find myself browsing the internet in the search of exact climbing route path. Or while being in new place, searching for climbing possibilities in the neighborhood. Paper guidebook is not always available and access to website's content is often premium. This webapp is my little answer to this problem.

"My vertical world" is a web application - browser based platform for climbers, where users can find and create information about climbing routes, walls and locations. Backend of the app created with Django REST Framwork in the form of API; on the the frontend React with Styled Components.
For user validation i decided to use Simple JWT - Django plugin.

Users who decided not to sign in can browse through existing data in the form of seprate tabs with:

- paginated and tabularized routes and walls data with possibility of providing order of displayed data,
- locations on the map, which uses OpenLayers API,
- search bar for the content.

Other way to scroll data is by using "News" tab, where information is displayed in the form of separate route cards with infinite scroll.

Logged in users can add route by their own using "Add route" tab. They will be asked to:

- provide location or add to existing one,
- provide wall image or add to existing one,
- finally, draw climbing route path - here Canvas API is beeing used.

Created routes, walls and locations can be later edited.

Sign in users can also comment and like any route, wall or location, as well as follow other users.
Data about logged user likes, follows and created content can be found in "User" tab.

## Technologies

Project is created with:

- Django 4.0.5
- djangorestframework 3.13.1
- Python 3.8.10
- PyJWT 2.4.0

- react: 18.1.0,
- react-dom: 18.1.0,
- react-router-dom: 6.3.0,
- styled-components: 5.3.5
- dayjs: 1.11.3,
- jwt-decode: 3.1.2",

Projects uses OpenLayers API: <URL: https://openlayers.org/>

## Features

- Backend set up as API,
- Frontend styling with React and Styled Components,
- Users authentication with JWT,
- Simple form validation with Styled Components,
- Searchbar for content,
- Infinite scroll ("News" tab),
- Data pagination, data ordering,
- Creating and displaying data with Canvas API,
- Saving media on local server,
- Creating and displaying data on map with OpenLayers,
- Liking content,
- Commenting content,
- Following users,
- Responsive design.

## Distinctiveness and Complexity

I believe my app is distinctive from other CS50W courses projects and possess satisfying level of complexity, because it:

- uses Django Rest Framework and set up backend as API,
- uses JWT authentication,
- uses React and other libraries,
- uses Styled Components,
- apps core functionalities are based on Canvas API: creating path, storing it in DB as JSON, reading it and rendering back on image. Proper scaling and responsiveness, as well as "highlighting" entered path - those i find reasonable complex,
- stores data on local server's hardrive,
- uses infinity scroll,
- make use of pagination and ordering - on the backend as well as on the frontend,
- uses OpenLayers API,
- have nice and responsive design ;)

## Files

### api

Folder containing backend of application. Written in Python.

- urls.py: API endpoints,
- models.py: django models for app's database,
- serializers.py: data serializers, prepers data for API,
- views.py: backend's core logic, view functions for the application.

### frontend

- urls.py: frontend endpoints, needed to correctly display pages.
- views.py: redirects to correct endpoint.
- .babelrc, webpack.config.js, package.json: configuration files for react.

#### frontend/src

Folder containing frontend of application. Written in Java Script / JSX.

#### assets:

Folder with static assets such as images and videos.

#### components

Folder with React components containing vital logic and styling. Some of them:

- ActiveTabBar.jsx: for switching content between tabs.
- CanvasCreate.jsx, CanvasShow.jsx, CanvasShowMany.jsx: usues Canvas API - let user create route path, displays path.
- RouteList.jsx: displays route list and lets interact with displayed route path.
- Map.jsx, LocationForm.jsx, LocationMap.jsx, Location.Overlay, SingleLocationOverlay.jsx, VectorLayer.jsx: uses OpenLayers API, let user interact with map.
- Comment.jsx, Like.jsx, Delete.jsx, Edit.jsx: let user comment, delete and like and edit content.
- Follow.jsx, FollowedUsers.jsx: provides information about users follow and lets follow other users.
- ExpendedOptions.jsx: hide and expend wrapper for options.
- Search.jsx: lets user search for content.
- RouteCard.jsx, RouteContainer.jsx: displays route cards in infinite scroll.
- Pagination.jsx: controlls for paginated content.
- ZoomController.jsx: zooms in and out canvas with routes.

#### constans

Folder with files and variables that will not be changed.

#### contexts

Folder with React context files, which provide information across components.

- AuthContext.jsx: provides authentication for user,
- LocationContext.jsx, MapContext.jsx: provides context for Location and Map components,
- MessageContext.jsx: provides consistent messages for user across app.

#### helpers

Folder with helper functions.

- AuthorContent.jsx: wrapper for content, that is only visible for author of it.
- PrivateContent.jsx: wrapper for content, that is only visible for logged users.
- PrivateRoute.jsx: wrapper for logged users endpoints.

#### pages

Folder with website pages, which contains components. Pages usually call API.

- App.jsx: application file with routes to webpages, global styles and some of vital contexts.

#### media

Folder, where user images will be saved.

## Setup

To run this project, open its directory, download all dependencies and requirements. After that run django web server:

```
cd ../my-vertical-world
python manage.py runserver
```

Enter local server.
