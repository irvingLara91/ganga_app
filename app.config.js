const commonConfig = {
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
        backgroundColor: "#e94d4d"
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        buildNumber: "1",
        supportsTablet: false,
        usesIcloudStorage: false,
        usesAppleSignIn: false,
        infoPlist: {
            UIUserInterfaceStyle: "Light"
        },
        bundleIdentifier: "com.ganga.quimera",
        userInterfaceStyle: "light"
    },
    android: {
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#FFFFFF"
        },
        package: "com.ganga.quimera",
        useNextNotificationsApi: true,
        userInterfaceStyle: "light",
        permissions: [
            "CAMERA"
        ]
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    description: ""
};

module.exports = () => {
    if (process.env.APP_ENV === "production") {
        return {
            ...commonConfig,
            name: "Ganga Hotel Móvil",
            slug: "gg-hotel-app",
            extra: {
                NAME_APP: "Ganga hoteles",
                BASE_URL: "BASE_URL"
            }

        };
    } else if (process.env.APP_ENV === "development") {
        return {
            ...commonConfig,
            name: "Ganga Hotel Móvil (Development)",
            slug: "gg-hotel-app-dev",
            extra: {
                NAME_APP: "Ganga Hoteles DEV",
                BASE_URL: "BASE_URL"
            }
        };
    }
};
