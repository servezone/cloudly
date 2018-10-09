export type TSupportedCloudProvider = "DigitalOcean" | "Hetzner" | "Scaleway" | "Exoscale" | "Vultr"

/**
 * This class takes care of onboarding new clusters and droplets to the servezone
 */
export class OnBoarder {
  constructor() {
    // nothing here
  }

  /**
   * onboard a new cluster from a cloud provider
   */
  createNewCluster(optionsArg: {
    cloudProvider: TSupportedCloudProvider
    providerApiKey: string
  }) {}

  /**
   * This function returns an config that can be user to onboard new servers
   * @param configId
   */
  provideConfigForServerConfig(configId: string) {}
}
