export default {
  expo: {
    name: "social-habits",
    slug: "social-habits",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "social-habits",
    userInterfaceStyle: "automatic",
    android: {
      package: "com.vinay.socialhabits",
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      envKeys: {
        OPEN_AI_KEY: process.env.OPEN_AI_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
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
