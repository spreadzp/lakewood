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
  Input,
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";
import Welcome from "./welcome";

export default class UseNerdgraphNerdletNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 2724907,
      accounts: null,
      selectedAccount: null,
    };
  }

  componentDidMount() {
    const accountId = this.state;
    const gql = `{ actor { accounts { id name } } }`;
    const accounts = NerdGraphQuery.query({ query: gql });
    accounts
      .then((results) => {
        console.log("Nerdgraph Response:", results);
        const accounts = results.data.actor.accounts.map((account) => {
          return account;
        });
        const account = accounts.length > 0 && accounts[0];
        this.setState({ selectedAccount: account, accounts });
      })
      .catch((error) => {
        console.log("Nerdgraph Error:", error);
      });
  }
  selectAccount(option) {
    this.setState({ accountId: option.id, selectedAccount: option });
  }

  render() {
    const { accountId, accounts, selectedAccount } = this.state;
    console.log({ accountId, accounts, selectedAccount });
    const query = `
        query($id: Int!) {
            actor {
                account(id: $id) {
                    name
                }
            }
        }
    `;
    const variables = {
      id: accountId,
    };

    const cpuTable = "`npm.avgCPULoad`";
    const cpuCaption = "`npm.caption`";
    const top10CPU = `SELECT average (${cpuTable}) FROM solarwinds_interfaces where npm.environment != 'Production' and npm.vendor = 'Linux' FACET ${cpuCaption} SINCE 4 HOURS AGO TIMESERIES limit 10`;
    const nonProdLinuxDevices =
      "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment != 'Production'";
    const relevantData =
      "SELECT npm.caption, npm.engineid, npm.avgCPULoad, npm.avgPercentMemUsed, npm.vendor, npm.deviceid, npm.servertype, npm.department, npm.percentloss, npm.IPAddress, npm.city, npm.state, npm.coresite, npm.criticalsite, npm.hostedapplication, npm.tier from solarwinds_interfaces where npm.environment != 'Production' and npm.vendor = 'Linux' since 10 minutes ago order by npm.avgCPULoad DESC limit max";
    const totalProdLinux =
      "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment = 'Production'";

    const metric = `FROM Metric SELECT count(newrelic.timeslice.value)
WHERE appName = 'lakewood-2'
WITH METRIC_FORMAT 'Custom/Labels/{action}'
TIMESERIES FACET action`;
    const avgResTime = `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `;
    const trxOverview = `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `;
    const errCount = `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `;
    const responseCodes = `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `;

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
              /* Taking a peek at the PlatformState */
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
                        <Welcome fullWidth accountId={accountId} />
                      </main>
                    </GridItem>

                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <Welcome fullWidth accountId={accountId} />
                      </main>
                    </GridItem>
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <Welcome fullWidth accountId={accountId} />
                      </main>
                    </GridItem>
                    <GridItem
                      className="primary-content-container"
                      columnSpan={6}
                    >
                      <main className="primary-content full-height">
                        <Welcome fullWidth accountId={accountId} />
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
