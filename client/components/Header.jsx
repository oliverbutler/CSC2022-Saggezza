import React, { Component } from "react";
import {
  Header as NativeHeader,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
export default class Header extends Component {
  render() {
    return (
      <NativeHeader>
        <Left>
          {this.props.leftIcon && (
            <Button transparent onPress={this.props.leftFunction}>
              <Icon name={this.props.leftIcon} />
            </Button>
          )}
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>{this.props.right}</Right>
      </NativeHeader>
    );
  }
}
