import React, { Component } from "react";
import { ListItem } from "react-native-elements";

import "../../secrets";

export class ApplicationsPreview extends Component {
  render() {
    return (
      <ListItem
        title={this.props.request.name}
        subtitle={this.props.request.status}
        bottomDivider
        chevron
        onPress={this.props.onPress}
      ></ListItem>
    );
  }
}

export default ApplicationsPreview;
