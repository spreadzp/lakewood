import React from "react";
import {
    Dropdown,
    DropdownItem
  } from "nr1";
  
export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            selectedData: {},
            list: [
                { id: 1, typeWidget: 'TableChart',
                 query:  `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `,
                 nameQuery: 'Top 10CPU' },
                { id: 2, typeWidget: 'TableChart',
                 query: `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `,
                  nameQuery: 'Average Response Time' },
                { id: 3, typeWidget: 'TableChart',
                 query: `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `,
                  nameQuery: 'Response Code' },
                  { id: 4, typeWidget: 'TableChart',
                 query: `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `,
                  nameQuery: 'Transaction Errors' },
            ],
        };
      }

      componentDidMount() {
        if(!this.state.selectedData.nameQuery ) {
            this.state.selectedData = this.state.list[0];
        }
      }

      sendData = (data) => {
        this.props.parentCallback(data);
   }

    selectWidget(option) {
        const newData = { id: option.id, typeWidget: option.typeWidget, query: option.query, nameQuery: option.nameQuery };
        const arrayWithoutId = this.state.list.filter(item => item.id !== option.id);
        this.setState({ list: [...arrayWithoutId, newData], selectedData: newData});
        this.sendData(newData);
    }
    render() {
        let items = this.state.list.map(account => (
            <DropdownItem key={account.id} onClick={() => this.selectWidget(account)}>
              {account.nameQuery}
            </DropdownItem>
          ));
          let response = <Dropdown title={this.state.selectedData.nameQuery}>
        {items}
      </Dropdown>

        return response;

    }

  }