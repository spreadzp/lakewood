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
