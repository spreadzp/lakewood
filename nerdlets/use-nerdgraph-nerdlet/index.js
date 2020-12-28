import React from "react";
import {
  PlatformStateContext,
  NerdGraphQuery,
  Grid,
  GridItem,
  Stack,
  StackItem,
  navigation,
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";
import Heatmap from "./../../components/heat-map";
import listQueries from "./../../queries.json";

export default class UseNerdgraphNerdletNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.selectContainer = this.selectContainer.bind(this);
    this.openEntity = this.openEntity.bind(this);
    this.state = {
      accountId: 1104476,
      accounts: null,
      selectedAccount: 1104476,
    };
  }

  componentDidMount() {
    const gql = `{ actor { accounts { id name } } }`;
    const accounts = NerdGraphQuery.query({ query: gql });
    accounts
      .then((results) => {
        console.debug("Nerdgraph Response:", results);
        const accounts = results.data.actor.accounts.map((account) => {
          return account;
        });
        this.setState({ selectedAccount: 1104476, accounts });
      })
      .catch((error) => {
        console.debug("Nerdgraph Error:", error);
      });
  }
  selectContainer(containerId) {
    this.setState({ containerId });
  }

  openEntity(queryItem) {
    const nerdletWithState = {
      id: "alerts",
      urlState: {
        selectedQuery: [queryItem],
      },
    };
    return navigation.openStackedNerdlet(nerdletWithState);
  }
  selectAccount(option) {
    this.setState({ accountId: option.id, selectedAccount: option });
  }

  render() {
    const queries = listQueries;

    const { accountId, accounts, selectedAccount } = this.state;
    console.debug("@@@@@", { accountId, accounts, selectedAccount });
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
                      columnSpan={8}
                    >
                      <main className="primary-content full-height">
                        {queries.map((item) => {
                          return (
                            <Heatmap
                              accountId={accountId}
                              query={item.query}
                              key={"plot.title"}
                              title={item.title}
                              formatLabel={(c) => c.slice(0, 6)}
                              formatValue={(value) => `${94}%`}
                              selection={item.query}
                              max={"100%"}
                              red={item.red}
                              orange={item.orange}
                              onSelect={(row) => {
                                console.debug("onSelect", row); //eslint-disable-line
                                this.openEntity(item);
                              }}
                              onClickTitle={(row) => {
                                console.debug("onClickTitle", row); //eslint-disable-line
                                this.openEntity(item);
                              }}
                            />
                          );
                        })}
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
