#!/bin/bash
# This script deploys the lambda to a specified region. Also adds a trigger for s3 bucket as 
# well as a prefix to filter the prefix
npm install
npm install -g claudia
claudia destroy || true
claudia create --region $REGION --handler lambda.handler --timeout $TIMEOUT --set-env BUCKET_NAME=$BUCKET_NAME
claudia add-s3-event-source --bucket $BUCKET --prefix $PREFIX || true
