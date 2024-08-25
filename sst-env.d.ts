/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Hono": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "Vite": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
export {}
