# DogDex 🐾

DogDex is a React Native mobile application built with [Expo](https://expo.dev) that lets dog lovers discover, explore, and save dog breeds and sub-breeds from around the world. Powered by the open-source [Dog CEO API](https://dog.ceo/dog-api/).

---

## 📱 Features

- **Welcome Onboarding**: Minimalist entry screen with custom Freckle Face typography and quick navigation.
- **Home Hub**:
  - Warm, cozy visual aesthetic with a curated color palette (`#FAF8F5`).
  - Search bar linking directly to the search screen.
  - Explore banner with dark-to-transparent gradient overlay highlighting 400+ breeds.
  - Popular Breeds carousel showcasing top companion breeds with a "See all" sub-screen link.
  - Browse by Group cards with dark gradient overlays and chevron navigation.
- **Dedicated Popular Breeds Screen**: Sub-screen showing 6 popular breeds (Golden Retriever, French Bulldog, Siberian Husky, Labrador Retriever, Beagle, Pug) with "Learn more" details.
- **Group Explorer**: Dedicated view displaying all sub-breeds for a selected dog family (Terrier, Hound, Spaniel, Retriever, Poodle, Mastiff) with fast parallel image loading.
- **Comprehensive Breed Details**:
  - Full-width hero image with smooth linear gradient shading.
  - Quick physical stats: Height, Weight, Lifespan.
  - "About the Breed" summary, Temperament chip tags, and Care Needs guide.
  - Interactive "Save Dog" and Favorite heart toggles.
- **Favorites & Saved Collection**: Dedicated tabs for organizing and reviewing your saved companions with custom sub-breed indicators.
- **Floating Dock Navigation**: Modern floating capsule bottom tab bar in white and warm brown tones with active pill indicators and a circular search action button.
- **Skeleton Loaders & Error States**:
  - Animated pulsing skeleton boxes for zero-flicker loading across all screens.
  - Dedicated "Something went wrong" card with a retry button for network interruptions.

---

## 📦 Dependencies

The app uses the following core libraries and Expo modules:

### Core & Framework
- `expo`: Expo SDK framework
- `expo-router`: File-based routing and navigation
- `react`: UI rendering engine
- `react-native`: Native mobile runtime
- `react-native-safe-area-context`: Safe area handling for edge-to-edge displays
- `react-native-screens`: Native navigation primitives
- `react-native-gesture-handler`: Touch and gesture interaction
- `react-native-reanimated`: Fluid UI animations
- `react-native-worklets`: Worklet execution engine

### UI, Media & Styling
- `expo-image`: Optimized image caching and rendering
- `expo-linear-gradient`: Smooth gradient overlays for cards and hero images
- `expo-glass-effect`: Glassmorphic styling utilities
- `expo-symbols`: SF Symbols support
- `expo-system-ui`: System UI color management
- `expo-status-bar`: Styled device status bar

### Icons & Typography
- `@react-native-vector-icons/material-design-icons`: Material Design icon library
- `expo-font`: Custom font loader
- `@expo-google-fonts/freckle-face`: Freckle Face branding font
- `@expo-google-fonts/inter`: Inter typography

### Utilities
- `expo-constants`: Device and project constants
- `expo-device`: Device information
- `expo-linking`: Deep linking capabilities
- `expo-splash-screen`: Native splash screen handling
- `expo-web-browser`: In-app web browser support
- `react-native-web`: Web platform support

---

## 🚀 How to Run the App

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/go) app installed on your physical iOS or Android device (or Android Studio / Xcode for emulators).

---

### 1. Install Dependencies

In the project root folder, install the packages:

```bash
npm install
```

*(Or if using Bun)*:
```bash
bun install
```

---

### 2. Start the Development Server

Start Expo's Metro bundler:

```bash
npx expo start
```

---

### 3. Open the App on Your Device or Emulator

Once the Metro bundler is running, choose your platform:

- **Physical Device**: Open the **Expo Go** app on Android and scan the QR code in the terminal, or scan the QR code using the **Camera** app on iOS.
- **Android Emulator**: Press `a` in the terminal to launch the app in Android Studio's emulator.
- **iOS Simulator** *(macOS only)*: Press `i` in the terminal to open Xcode's simulator.
- **Web Browser**: Press `w` in the terminal to run in your default web browser.

---

## 📁 Project Structure

```text
DogDex/
├── assets/                  # Local static images (banners, groups, avatars)
├── src/
│   ├── api/
│   │   └── dogApi.ts        # Dog CEO REST API integration
│   ├── app/
│   │   ├── (tabs)/          # Bottom navigation tabs
│   │   │   ├── _layout.tsx  # Floating bottom dock navigation bar
│   │   │   ├── home.tsx     # Home hub screen
│   │   │   ├── search.tsx   # Search & group explorer screen
│   │   │   ├── favorite.tsx # Favorites collection screen
│   │   │   └── save.tsx     # Saved breeds collection screen
│   │   ├── breed/
│   │   │   └── [breed].tsx  # Dynamic breed details & care guide
│   │   ├── group/
│   │   │   └── [group].tsx  # Sub-breeds listing for a breed family
│   │   ├── _layout.tsx      # Root Stack navigator & DogProvider
│   │   ├── index.tsx        # Welcome / onboarding splash screen
│   │   └── popular.tsx      # Dedicated popular breeds sub-screen
│   ├── components/
│   │   ├── BreedCard.tsx    # Square breed card with dog image and label
│   │   ├── BrowseGroups.tsx # Grid container for group cards
│   │   ├── ErrorState.tsx   # Reusable error card with retry button
│   │   ├── FavoriteBreedCard.tsx # Favorite breed card with heart toggle
│   │   ├── GroupCard.tsx    # Card with gradient and bottom group title
│   │   ├── PopularBreeds.tsx# Home section for popular breeds with skeleton
│   │   ├── SavedBreedCard.tsx    # Saved breed card with bookmark toggle
│   │   └── Skeleton.tsx     # Animated pulsing skeleton box component
│   ├── context/
│   │   └── dogContext.tsx   # Dog favorite and saved state management
│   └── types/
│       └── dog.ts           # TypeScript interfaces and models
├── app.json                 # Expo application configuration
├── package.json             # Project dependencies and run scripts
└── tsconfig.json            # TypeScript compiler configuration
```
