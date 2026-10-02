import { ImageSourcePropType } from 'react-native';

export type Breed = {
    image: ImageSourcePropType;
    name: string;
    onPress: () => void;
}

export type Dog = {
    image: string;
    name: string;
    group?: string;
}

