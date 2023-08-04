# Stock Tracker App - React Native Expo

Welcome to the Stock Tracker app! This is a production-grade React Native Expo project that allows you to track stock prices using marketstack data. The app fetches stock data using an API key, which can be easily changed in the `stockStore.js` file in the config folder. You can run the app using Expo by following the instructions below.

## Getting Started

To run the Stock Tracker app on your local machine, make sure you have Node.js and Expo CLI installed.

### Prerequisites

1. [Node.js](https://nodejs.org/) - Make sure you have Node.js installed. You can download the latest stable version from the official website.

2. [Expo CLI](https://docs.expo.dev/get-started/installation/) - Install Expo CLI globally on your machine using npm.

### Installing Dependencies

After cloning the repository, navigate to the project folder in the terminal and run the following command to install all the dependencies:

```bash
npm install
```
or
```bash
yarn
```

### Configuration

Before running the app, you need to obtain an API key from marketstack. If you don't have one, sign up for an account and get your API key.

Next, open the `stockStore.js` file in the project's config/mobX Store root directory. Find the following line and replace `'BASE_KEY'` with your actual API key:

```javascript
const BASE_KEY = 'YOUR_MARKETSTACK_API_KEY';
```

Save the file after making the change.

## Running the App

To start the app, run the following command in the terminal:

```bash
expo start
```

This will start the Expo development server and show a QR code in the terminal. You can run the app on your physical device by scanning this QR code using the Expo Go app. Alternatively, you can run the app on an iOS/Android emulator.

## Features
View real-time stock prices and information.
Add and track multiple stocks at once.
From the Home Screen, click on each stock to check the details.
Stock Detail Screen allows you to filter data with predefined filters: 3d, 7d, 30d, all.
Switch between line chart and candlestick chart in the Stock Detail Screen.
Use a custom date range by clicking the button in the Stock Detail Screen.
Click the star icon in the Stock Detail Screen to add the stock to your watchlist.
Portfolio Screen with an autocomplete text bar for searching and adding stocks to your portfolio.
After adding stocks to the portfolio, get updated data on the total cost of all the stocks.
Swipe right in the Portfolio Screen to delete a stock from the portfolio.
Watchlist Screen displays a list of watchlisted stocks, and you can click on them to see their details.

## Folder Structure

```
stock-tracker/
  |- assets/
  |- components/
  |- config/
  |- navigation/
  |- screens/
  |- App.js
  |- package.json
  |- ...
```

- `assets/`: Contains static assets like images and fonts.
- `components/`: Contains reusable components used throughout the app.
- `screens/`: Contains different screens of the app.
- `App.js`: Entry point of the application.
- `config/`: Contains the configuration for fetching stock data from marketstack.
- `navigation/`: Contains the different navigation stacks.



## Contributing

If you want to contribute to this project, feel free to submit a pull request. Please make sure to follow the existing code style and write unit tests for new features.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to express our gratitude to the developers of marketstack for providing the API that powers this app.

Happy stock tracking! If you have any questions or need assistance, feel free to contact us at `farouqseriki7@gmail.com`.



The above README file provides a production-grade guide to set up and run the Stock Tracker app, along with instructions for API key configuration, features, folder structure, and how to contribute to the project. It also includes acknowledgments and a license section. Make sure to replace `'BASE_KEY'` with the actual API key obtained from marketstack. Feel free to modify the README according to your specific project requirements and style.