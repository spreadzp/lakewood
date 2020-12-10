import React from "react";
import { Button } from "nr1";

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        onClick={() => alert("Add widget!")}
        type={Button.TYPE.PRIMARY}
        sizeType={Button.SIZE_TYPE.MEDIUM}
        iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__NOTES__A_ADD}
      >
        Add widget
      </Button>
    );
  }
}
