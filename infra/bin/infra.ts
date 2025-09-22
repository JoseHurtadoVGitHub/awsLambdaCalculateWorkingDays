#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ProyectoStack } from "../lib/proyecto-stack";

const app = new cdk.App();

new ProyectoStack(app, "ProyectoStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
