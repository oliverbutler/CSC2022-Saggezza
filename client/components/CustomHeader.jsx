import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
export default class HeaderIconExample extends Component {
  render() {
    return (
      <Header>
        <Left>
          {this.props.leftIcon && (
            <Button transparent onPress={() => this.props.leftFunction()}>
              <Icon name={this.props.leftIcon} />
            </Button>
          )}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>{this.props.children}</Right>
      </Header>
    );
  }
}
