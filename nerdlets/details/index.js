import React from "react";
import {
  PlatformStateContext,
  NerdGraphQuery,
  NerdletStateContext,
  Grid,
  GridItem,
  Stack,
  StackItem,
  TableChart,
  navigation,
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";

import listQueries from "./../../queries.json";

export default class DetailsNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 1104476,
      accounts: null,
      selectedAccount: 1104476,
    };
  }

  componentDidMount() {
    const accountId = this.state;
    const gql = `{ actor { accounts { id name } } }`;
    const accounts = NerdGraphQuery.query({ query: gql });
    accounts
      .then((results) => {
        console.debug("Nerdgraph Response:", results);
        const accounts = results.data.actor.accounts.map((account) => {
          return account;
        });
        const account = accounts.length > 0 && accounts[0];
        this.setState({ selectedAccount: 1104476, accounts });
      })
      .catch((error) => {
        console.debug("Nerdgraph Error:", error);
      });
  }

  render() {
    const queries = listQueries;
    const { accountId, accounts, selectedAccount } = this.state;
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
                <NerdletStateContext.Consumer>
                  {(nerdletUrlState) => {
                    return (
                      <Grid
                        className="primary-grid"
                        spacingType={[
                          Grid.SPACING_TYPE.NONE,
                          Grid.SPACING_TYPE.NONE,
                        ]}
                      >
                        <GridItem
                          className="primary-content-container"
                          columnSpan={12}
                        >
                          <main className="primary-content full-height">
                            <TableChart
                              fullWidth
                              accountId={accountId}
                              query={nerdletUrlState.itemQuery.queryItem}
                            />
                          </main>
                        </GridItem>
                      </Grid>
                    );
                  }}
                </NerdletStateContext.Consumer>
              );
            }}
          </PlatformStateContext.Consumer>
        </StackItem>
      </Stack>
    );
  }
}
