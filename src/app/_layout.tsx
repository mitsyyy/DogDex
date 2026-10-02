import { Stack } from 'expo-router';
import { DogProvider } from '../context/dogContext';

export default function RootLayout() {
  return (
    <DogProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </DogProvider>
  );
}