/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cloud-map",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-2",
        },
        "@pulumiverse/vercel": true,
      },
    };
  },
  async run() {
    const postgresUrl = new sst.Secret("PostgresUrl");

    const hono = new sst.aws.Function("Hono", {
      url: true,
      handler: "packages/hono/src/index.handler",
    });

    const vite = new sst.aws.StaticSite("Vite", {
      path: "packages/vite",
      build: {
        command: "pnpm run build",
        output: "dist",
      },
      environment: {
        VITE_API_URL: hono.url,
      },
    });

    new sst.x.DevCommand("Studio", {
      dev: {
        autostart: false,
        command: "npx drizzle-kit studio",
        directory: "packages/db",
      },
      link: [postgresUrl],
    });

    return {
      hono: hono.url,
      vite: vite.url,
      drizzleStudio: "https://local.drizzle.studio/",
    };
  },
});
