# Scrape O Site
### Table of Contents
- [Description](#description)
- [How To Use](#how-to-use)
- [Author Info](#author-info)

---

<br>

## Description

>This full stack application aims to allow users scrape data from websites that do not have an api or a free one. The user can select a website from a pre-configured list that has a search function. The user can search the selected site and the users query would be used to scrape information from the selected site.

#### Technologies
- FrontEnd
  - React
  - JavaScript
  - React Bootstrap
- Backend
  - Express
  - Mongoose
  - Puppeteer

[Back To The Top](#scrape-o-site)

---

<br>

## How To Use

#### Installation
```bash
  $ npm install
  $ npm run react-build
  $ npm run express-dev
```
<br>

### Usage
>A user can search a website from the dropdown and the page should produce a result based on the website selected. The user also has the option to create an account to store their recent searches. A users recent searches will be displayed under their name.

<br>

#### Other Notes
>If this app in not being ran locally the ```index.js``` file in the ```dataBase``` folder will need to be updated
```javascript
const dbIP = `mongodb://${/* ip address */}:27017/Scraper`
```

[Back To The Top](#scrape-o-site)

---

## Author Info
>Tyler Engel

[![LinkedIn](https://img.shields.io/badge/LinkedIn%20-%23323330.svg?logo=LinkedIn&style=for-the-badge&logoColor=blue&color=white)](https://www.linkedin.com/in/tylerengel/)
[![GitHub](https://img.shields.io/badge/GitHub%20-%23323330.svg?logo=GitHub&style=for-the-badge&logoColor=black&color=white)](https://github.com/Tyl3r-Engel)

[Back To The Top](#scrape-o-site)
