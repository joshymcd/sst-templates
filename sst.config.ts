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

    return {
      hono: hono.url,
      vite: vite.url,
    };
  },
});
