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

export type SavedBreedCropProps = {
    name: string;
    image: string;
    subBreed?: string;
    group?: string;
    isFavorite?: boolean;
    onPress: () => void;
    onToggleFavorite?: () => void;
    onRemove?: () => void;
}

export type FavoriteBreedCardProps = {
    name: string;
    image: string;
    onPress: () => void;
    onFavoritePress: () => void;
}

export type BreedSearchItem = {
    name: string;
    group?: string;
}