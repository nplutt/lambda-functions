#!/bin/bash
# This script deploys the lambda to a specified region. Also adds a trigger for s3 bucket as 
# well as a prefix to filter the prefix
npm install
npm install -g claudia
claudia destroy --config destroy.json || true
claudia create --region $REGION --handler lambda.handler --timeout $TIMEOUT --role $LAMBDA_ROLE --set-env BUCKET_NAME=$WEB_BUCKET
claudia add-s3-event-source --bucket $BUCKET --prefix $PREFIX || true
