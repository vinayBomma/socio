export default {
  expo: {
    name: "Socio",
    slug: "social-habits",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "com.vinay.socio",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    android: {
      package: "com.vinay.socio",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#000000",
      },
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "*.supabase.co",
              pathPrefix: "/home",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      "expo-router",
      ["expo-notifications", { sounds: ["./assets/notification.wav"] }],
      [
        "@sentry/react-native/expo",
        {
          organization: "vinay-ni",
          project: "socio",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      envKeys: {
        OPEN_AI_KEY: process.env.OPEN_AI_KEY,
        GEMINI_KEY: process.env.GEMINI_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
        SENTRY_DSN: process.env.SENTRY_DSN,
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      },
      router: {
        origin: false,
      },
      eas: {
        projectId: "ae2a2fac-ca03-44a0-a983-faaae8d94c88",
      },
    },
  },
};
