import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class ProyectoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda
    const lambdaCalculator = new lambda.Function(this, "LambdaCalculator", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler", // tu index.js exporta handler
      code: lambda.Code.fromAsset(path.join(__dirname, "../../dist")), // empaqueta TODO dist
    });

    // API Gateway
    new apigateway.LambdaRestApi(this, "Endpoint", {
      handler: lambdaCalculator, // 👈 aquí usas la lambda que definiste
      proxy: true,
    });
  }
}
