import React from "react";
import { Button } from "nr1";

export default class RemoveItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        onClick={() => alert("Remove widget")}
        type={Button.TYPE.DESTRUCTIVE}
        sizeType={Button.SIZE_TYPE.SMALL}
        iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__CLOSE__SIZE_8}
      >
        Remove widget
      </Button>
    );
  }
}
