# challenge-suade-2

> A Data Editor

This project gives the user a UI which gives them the ability to upload a CSV file which is then presented as a table.
The user can then edit the fields in the table and export the result into json format.
The user is given an option to add header to their csv file.

If they add the header, it appears in  header format in the table and also the header values become keys value of the properties in the json output.

If they don't add the header, the data will appear with numeric keys in the json output.

To test the app, you can use any CSV file. There is an example available in /example/people.csv

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run integration tests
> make sure you are running your app before running the cypress tests

## headless
npx cypress run

## in chrome
npx cypress open

# run all tests
npm test
```

