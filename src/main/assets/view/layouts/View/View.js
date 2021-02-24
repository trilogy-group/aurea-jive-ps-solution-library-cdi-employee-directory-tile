import React from 'react';
import { withTranslation } from 'react-i18next';

// Child components
import { Loader } from 'ps-solution-library-ui-common/ui/components';

// Utils
import { tileUtils } from 'ps-solution-library-ui-common';

// Initial values
import initialValues from '../../../common/js/config/initialValues';

// Assets
import logo from '../../assets/images/logo.png';

// React Components

import EmployeeData from '../../components/EmployeeData'


class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // Get tile data with default values included
  componentWillMount = () => {
    tileUtils.getConfig(config => {
      this.setState({ config: Object.assign(initialValues, config) });
    });
  }

  // Render tile UI (Show a loader until tile data is loaded)
  render() {
    const { config } = this.state;
    const { t } = this.props;
    return (
      !config ?
        <Loader element />
        :
        <EmployeeData config={config} />
    );
  }
}

export default withTranslation()(View);