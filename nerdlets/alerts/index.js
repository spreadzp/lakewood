import React from "react";
import {
  PlatformStateContext,
  NerdGraphQuery,
  NerdletStateContext,
  Spinner,
  HeadingText,
  Button,
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
  Label,
  navigation,
  nerdlet
} from "nr1";
import { timeRangeToNrql } from "@newrelic/nr1-community";

import Heatmap from "./../../components/heat-map";
import listQueries from "./../../queries.json";

export default class AlertNerdlet extends React.Component {
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
  selectContainer(containerId) {
    this.setState({ containerId });
  }

  openEntity(item) {
    const nerdletWithState = {
      id: 'details',
      urlState: {
        itemQuery: item,
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
    //setInterval(() => {
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
                {(nerdletUrlState) => (

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
                        {

                          nerdletUrlState.selectedQuery.map((item) => {


                          return (
                            <Heatmap
                              accountId={accountId}
                              query={item.query}
                              key={item.id}
                              title={item.title}
                              formatLabel={(c) => c.slice(0, 18)}
                              formatValue={(value) => `${value}`}
                              selection={item.query}
                              max={item.value}
                              red={item.red}
                              orange={item.orange}
                              onSelect={(row) => {
                                console.debug("onSelect", row); //eslint-disable-line
                                console.log('##########item :>> ', item);
                                item.queryItem = item.queryItem + `'${row}'`;
                                this.openEntity(item);
                              }}
                              onClickTitle={(item) => {
                                console.debug("onClickTitle", item); //eslint-disable-line
                                this.openEntity(item);
                              }}
                            />
                          );
                        })

                      }
                      </main>
                    </GridItem>
                  </Grid>
                  )}
                  </NerdletStateContext.Consumer>
              );

            }}
          </PlatformStateContext.Consumer>
        </StackItem>
      </Stack>
    ) // }, 60000)
  }
}

