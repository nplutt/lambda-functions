#!/bin/bash
# This script deploys the lambda to a specified region. Also adds a trigger for s3 bucket as 
# well as a prefix to filter the prefix
npm update claudia
claudia create --region $REGION --handler lambda.handler --timeout $TIMEOUT
claudia add-s3-event-source --bucket $BUCKET --prefix $PREFIX
