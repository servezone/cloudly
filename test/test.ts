import { expect, tap } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';
let testQenv = new Qenv('./', './.nogit/');

import * as cloudly from '../ts/index';

import { SzCluster } from '@servezone/servezone';

process.env.TESTING_CLOUDLY = 'true';

let testCloudlyConfig: cloudly.CloudlyConfig;
let testCloudly: cloudly.Cloudly;

tap.test('first test', async () => {
  testCloudly = new cloudly.Cloudly({
    cfEmail: testQenv.getEnvVarOnDemand('CF_EMAIL'),
    cfToken: testQenv.getEnvVarOnDemand('CF_TOKEN'),
    letsEncryptEmail: testQenv.getEnvVarOnDemand('LETSENCRYPT_EMAIL'),
    publicUrl: testQenv.getEnvVarOnDemand('PUBLIC_URL'),
    splashPageUrl: testQenv.getEnvVarOnDemand('SPLASHPAGE_URL'),
  });
  expect(testCloudly).to.be.instanceof(cloudly.Cloudly);
});

tap.test('should init servezone', async () => {
  await testCloudly.start();
});

tap.test('should have a default szCluster assigned', async () => {
  expect(testCloudly.szClusterRef).to.be.instanceOf(SzCluster);
});

tap.test('should end the service', async () => {
  await testCloudly.stop();
});

tap.start();
