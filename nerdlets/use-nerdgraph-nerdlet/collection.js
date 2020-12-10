import React from "react";
import {
    Dropdown,
    DropdownItem
  } from "nr1";
import RemoveItem from './remove-item';

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            selectedData: { id: 1, typeWidget: 'AreaChart',
            query:  `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `,
            nameQuery: 'Average Response Tim' },
            list: [
                { id: 1, typeWidget: 'AreaChart',
                 query:  `SELECT average(duration) FROM Transaction FACET appName TIMESERIES AUTO `,
                 nameQuery: 'Average Response Tim' },
                { id: 2, typeWidget: 'TableChart',
                 query: `FROM Transaction SELECT count(*) as 'Transactions', apdex(duration) as 'apdex', percentile(duration, 99, 95) FACET appName `,
                  nameQuery: 'Transaction Overview' },
                { id: 3, typeWidget: 'PieChart',
                 query: `FROM TransactionError SELECT count(*) as 'Transaction Errors' FACET error.message `,
                  nameQuery: 'Response Code' },
                  { id: 4, typeWidget: 'PieChart',
                 query: `SELECT count(*) as 'Response Code' FROM Transaction FACET httpResponseCode `,
                  nameQuery: 'Transaction Errors' },
                  { id: 5, typeWidget: 'TableChart',
                  query: "SELECT npm.caption, npm.engineid, npm.avgCPULoad, npm.avgPercentMemUsed, npm.vendor, npm.deviceid, npm.servertype, npm.department, npm.percentloss, npm.IPAddress, npm.city, npm.state, npm.coresite, npm.criticalsite, npm.hostedapplication, npm.tier from solarwinds_interfaces where npm.environment != 'Production' and npm.vendor = 'Linux' since 10 minutes ago order by npm.avgCPULoad DESC limit max",
                   nameQuery: 'Top 10CPU' },
                   { id: 6, typeWidget: 'TableChart',
                   query: "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment = 'Production'",
                    nameQuery: 'Total prod linux devices:' },
                    { id: 7, typeWidget: 'TableChart',
                   query: "SELECT uniqueCount(npm.caption as NonProductionLinuxServers) from solarwinds_interfaces where npm.vendor = 'Linux' and npm.environment = 'Production'",
                    nameQuery: 'Non Prod Linux Devices:' },
            ],
        };
      }

      componentDidMount() {
        this.forceUpdate();
        //if(!this.state.selectedData.nameQuery ) {
            //this.state.selectedData = this.state.list[0];
        //}
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
          let response = <div><Dropdown title={this.state.selectedData.nameQuery}>
        {items}
      </Dropdown><RemoveItem /></div>

        return response;

    }

  }