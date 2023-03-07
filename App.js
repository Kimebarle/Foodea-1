import React from 'react'
import Routes from './src/Routes'
import { AuthProvider } from './src/api/context/auth/AuthContext'
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
// import Colors from './src/utils/Colors'

// const theme = {
//     ...DefaultTheme,
//     roundness: 2,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: Colors.primary,
//         accent: Colors.secondary,
//     },
//     fonts: {
//         ...DefaultTheme.fonts,
//         regular: { fontFamily: 'EncodeSansExpaded-Light' },
//         medium: { fontFamily: 'EncodeSansExpaded-Medium' },
//         light: { fontFamily: 'EncodeSansExpaded-Light' },
//         thin: { fontFamily: 'EncodeSansExpaded-Light' },
//     },
// }



const App = () => {

    let [fontsLoaded] = useFonts({
        'Poppins-Medium'   : require('./assets/fonts/poppins/Poppins-Medium.ttf'),
        'Poppins-Light'    : require('./assets/fonts/poppins/Poppins-Light.ttf'),
        'Poppins-SemiBold' : require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
        'Poppins-Bold'     : require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    })

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
            <PaperProvider>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </PaperProvider>
    )
}

export default App
