import React from "react";
import {
  PlatformStateContext,
  NerdGraphQuery,
  Spinner,
  HeadingText,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Select,
  SelectItem,
  AreaChart,
  TableChart,
  PieChart,
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";

 

export default class UseNerdgraphNerdletNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 2724907,
      accounts: null,
      selectedAccount: null,
    };
  }

  /* Add componentDidMount here */

  /* Add componentDidMount here */

  selectAccount(option) {
    this.setState({ accountId: option.id, selectedAccount: option });
  }

  render() {
    const { accountId, accounts, selectedAccount } = this.state;
    console.log({ accountId, accounts, selectedAccount });
    const variables = {
      id: accountId,
    };

    {
      /* Add query here*/
    }

    {
      /* Add query here*/
    }

    const top10CPU =
      "SELECT average(`npm.avgCPULoad`) FROM solarwinds_interfaces where npm.environment != 'Production' and npm.vendor = 'Linux' FACET `npm.caption` SINCE 4 HOURS AGO TIMESERIES limit 10";
    const nonProdLinuxDevices =
      "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment != 'Production'";
    const relevantData =
      "SELECT npm.caption, npm.engineid, npm.avgCPULoad, npm.avgPercentMemUsed, npm.vendor, npm.deviceid, npm.servertype, npm.department, npm.percentloss, npm.IPAddress, npm.city, npm.state, npm.coresite, npm.criticalsite, npm.hostedapplication, npm.tier from solarwinds_interfaces where npm.environment != 'Production' and npm.vendor = 'Linux' since 10 minutes ago order by npm.avgCPULoad DESC limit max";
    const totalProdLinux =
      "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment = 'Production'";
    return (
      <Stack
        fullWidth
        horizontalType={Stack.HORIZONTAL_TYPE.FILL}
        gapType={Stack.GAP_TYPE.EXTRA_LOOSE}
        spacingType={[Stack.SPACING_TYPE.MEDIUM]}
        directionType={Stack.DIRECTION_TYPE.VERTICAL}
      >
        <StackItem>
          <hr />
          <PlatformStateContext.Consumer>
            {(PlatformState) => {
              const since = timeRangeToNrql(PlatformState);
              return (
                <>
                  <Grid
                    className="primary-grid"
                    spacingType={[
                      Grid.SPACING_TYPE.NONE,
                      Grid.SPACING_TYPE.NONE,
                    ]}
                  >
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <HeadingText
                          spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                          type={HeadingText.TYPE.HEADING_4}
                        >
                          Top 10 CPU:
                        </HeadingText>
                        <TableChart
                          fullWidth
                          accountId={accountId}
                          query={top10CPU}
                        />
                      </main>
                    </GridItem>
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <HeadingText
                          spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                          type={HeadingText.TYPE.HEADING_4}
                        >
                          Total non prod linux devices:
                        </HeadingText>
                        <TableChart
                          fullWidth
                          accountId={accountId}
                          query={nonProdLinuxDevices}
                        />
                      </main>
                    </GridItem>
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <HeadingText
                          spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                          type={HeadingText.TYPE.HEADING_4}
                        >
                          Total prod linux devices:
                        </HeadingText>
                        <TableChart
                          fullWidth
                          accountId={accountId}
                          query={totalProdLinux}
                        />
                      </main>
                    </GridItem>
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <HeadingText
                          spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                          type={HeadingText.TYPE.HEADING_4}
                        >
                          Table with all columns of relevant data:
                        </HeadingText>
                        <TableChart
                          fullWidth
                          accountId={accountId}
                          query={relevantData}
                        />
                      </main>
                    </GridItem>
                  </Grid>
                </>
              );
            }}
          </PlatformStateContext.Consumer>
        </StackItem>
      </Stack>
    );
  }
}
