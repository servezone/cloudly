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
    publicPort: testQenv.getEnvVarOnDemand('PUBLIC_PORT'),
    splashPageUrl: testQenv.getEnvVarOnDemand('SPLASHPAGE_URL'),
    mongoDescriptor: {
      mongoDbName: testQenv.getEnvVarOnDemand('MONGODB_DATABASE'),
      mongoDbPass: testQenv.getEnvVarOnDemand('MONGODB_PASSWORD'),
      mongoDbUrl: testQenv.getEnvVarOnDemand('MONGODB_URL')
    },
    digitalOceanToken: testQenv.getEnvVarOnDemand('DIGITALOCEAN_TOKEN')
  });
  expect(testCloudly).to.be.instanceof(cloudly.Cloudly);
});

tap.test('should init servezone', async () => {
  await testCloudly.init();
});

tap.test('should have a default szCluster assigned', async () => {
  expect(testCloudly.szClusterRef).to.be.instanceOf(SzCluster);
});

tap.test('should end the service', async () => {
  await testCloudly.stop();
});

tap.start();
