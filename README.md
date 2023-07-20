# MovieVault - Movie App

## Overview

This project is a mobile movie application build using the [TMDB](https://www.themoviedb.org/?language=en-CA) API. The app is build using Expo, React Native and NativeWind. This product uses the TMDB API but is not endorsed or certified by TMDB.

## Technologies Used

- JavaScript
- React Native
- NativeWind
- Tailwind CSS
- Axios

## Features

- Browse a list of upcoming and trending movies/tv shows.
- Search for specific movies/tv shows using keywords.
- View detailed information about each movie/tv show, such as title, release date, rating, cast and synopsis.
- Save favourite movies, tv shows or cast for easy access.

## Prerequisites

Before using the app, make sure you have the following installed on your development machine:

- Node.js (https://nodejs.org)
- Expo CLI (Install using npm install -g expo-cli)

## Usage

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/HamzaAbouJaib/MovieVault.git
   cd movie-app
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Obtain an API key from TMDB and then create a file in the root directory called "apiKey.js" and place the following code in:
   ```javascript
   export default apikey = "YOUR_API_KEY_HERE";
   ```
   Replace YOUR_API_KEY_HERE with the API key you obtained from TMDB.
4. To run the app run the following command and ensure a running physical device or emulator:
   - To run the app on your physical device, download the Expo Go app from the App Store (iOS) or Google Play Store (Android) and scan the QR code displayed in the Expo development server.
   - To run the app on an emulator, follow the Expo documentation on how to set up emulators for iOS and Android.
   ```bash
   expo start
   ```

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
