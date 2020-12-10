import React from "react";
import {
    TableChart,
    HeadingText,
    AreaChart,
    PieChart,
  } from "nr1";

  import Collection from './collection';
 
export default class Welcome extends React.Component {

    state = { selectedData: {} }
    callbackFunction = (childData) => {
          this.setState({selectedData: childData})
    }
    render() {
        let response;
        const header = <HeadingText spacingType={[HeadingText.SPACING_TYPE.MEDIUM]} type={HeadingText.TYPE.HEADING_4}>
               {this.state.selectedData.nameQuery}
                </HeadingText>;
        const typeTag = this.state.selectedData.typeWidget;
            switch (typeTag) {
                case 'TableChart':
                    response = <div> {header} <Collection parentCallback = {this.callbackFunction}/><TableChart fullWidth accountId={this.props.accountId} query={this.state.selectedData.query} /> </div>;
                    break;
                case 'AreaChart':
                    response = <div> {header} <Collection parentCallback = {this.callbackFunction}/><AreaChart fullWidth accountId={this.props.accountId} query={this.state.selectedData.query} /></div>;
                    break;
                case 'PieChart' :
                    response = <div> {header} <Collection parentCallback = {this.callbackFunction}/><PieChart fullWidth accountId={this.props.accountId} query={this.state.selectedData.query} /></div>;
                    break;
                case 'PieChart' :
                        response = <div> {header} <Collection parentCallback = {this.callbackFunction}/><PieChart fullWidth accountId={this.props.accountId} query={this.state.selectedData.query} /></div>;
                        break;
                default:

                    response =  <div> {header}<Collection parentCallback = {this.callbackFunction}/>
                    <PieChart fullWidth accountId={this.props.accountId} query={this.state.selectedData.query} /></div>;
                break;
            }

        return response;

    }
  }