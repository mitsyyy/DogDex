import { useEffect, useState } from 'react';
import { Animated, type StyleProp, StyleSheet, type ViewStyle } from 'react-native';

export function SkeletonBox({
    width,
    height,
    borderRadius = 12,
    style,
}: {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}) {
    const [opacityAnim] = useState(() => new Animated.Value(0.4));

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 0.85,
                    duration: 750,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.4,
                    duration: 750,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [opacityAnim]);

    return (
        <Animated.View
            style={[
                styles.skeletonBase,
                {
                    width: width as any,
                    height: height as any,
                    borderRadius,
                    opacity: opacityAnim,
                },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    skeletonBase: {
        backgroundColor: '#EAE5DF',
    },
});
