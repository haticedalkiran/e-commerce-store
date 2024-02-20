# E-Commerce Store

## Scripts

`yarn dev`, starts development server

`yarn build`, bundles project

`yarn lint`, runs eslint

In this project, products are shown on the homepage at launch, displaying the brand, name, rating, number of reviews and price to the user. product brands and categories listed on the filters tab. Additionally, there are filters for price range and rating. Users can perform searches by entering text as well.

When users modify the filters, the state is updated. Updates in the state are monitored within a useEffect hook in Layout.tsx and if any changes occur, the applyFilter() function is dispatched. A button to clear filters is enabled to reset to the initial state.

In this application, products can be sorted not only by the default arrangement but also according to criteria such as increasing price, decreasing price, and the number of reviews. The view can be toggled between a grid view and a list view, providing flexibility in how the products are displayed.
