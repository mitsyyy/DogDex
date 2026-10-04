import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryText?: string;
}

export default function ErrorState({
    title = 'Something went wrong',
    message = "We couldn't load the data. Please check your internet connection and try again.",
    onRetry,
    retryText = 'Try Again',
}: ErrorStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconCircle}>
                    <MaterialDesignIcons name="alert-circle-outline" size={32} color="#B5683D" />
                </View>

                <Text style={styles.title}>{title}</Text>

                <Text style={styles.message}>{message}</Text>

                {onRetry && (
                    <Pressable
                        style={styles.retryButton}
                        onPress={onRetry}
                        accessibilityRole="button"
                        accessibilityLabel={retryText}
                    >
                        <Text style={styles.retryButtonText}>{retryText}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },

    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#FAF2EB',
        borderWidth: 2,
        borderColor: '#C87D55',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F1E1D',
        marginTop: 16,
        textAlign: 'center',
    },

    message: {
        fontSize: 14,
        color: '#6B6259',
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 8,
        maxWidth: 280,
    },

    retryButton: {
        marginTop: 22,
        backgroundColor: '#352B23',
        paddingVertical: 12,
        paddingHorizontal: 36,
        borderRadius: 24,
    },

    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});
