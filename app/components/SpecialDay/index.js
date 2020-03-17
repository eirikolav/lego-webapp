// @flow
import React from 'react';
import config from 'app/config';
import AprilFools from './AprilFools';

type Props = {
  children: any
};

class SpecialDay extends React.Component<Props> {
  static getSpecialDay() {
    if (AprilFools.isCorrectDate()) {
      return AprilFools;
    }
    return null;
  }

  render() {
    const { children, ...rest } = this.props;
    const specialDay = SpecialDay.getSpecialDay();

    if (config.environment === 'ci' || specialDay === null) {
      return React.Children.map(children, child =>
        React.cloneElement(child, { ...rest })
      );
    }

    return React.createElement(specialDay, rest, children);
  }
}

export default SpecialDay;