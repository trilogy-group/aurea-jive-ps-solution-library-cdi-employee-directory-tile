import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { i18n, redux } from 'ps-solution-library-ui-common';

// Child components
import { SimpleForm, FieldWrapper } from 'ps-solution-library-ui-common/ui/components';

// Form Initial values
import initialValues from '../../../common/js/config/initialValues';

// Variables
const DEFAULT_TITLE = 'Default title'; // Also update "title" in sampleData prop inside of defintion.json

// Form
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTitle = (values) => {
    if (values.customTitle && values.showTitle) {
      values.title = values.customTitle;
    }
    if (values.title && !values.showTitle) {
      values.title = '';
    }
    if (values.customTitle === '' && values.showTitle) {
      values.title = DEFAULT_TITLE;
    }
    return values; 
  }

  render() {
    const { t, ...rest } = this.props;
    return (
      // SimpleForm Component can accept the following properties:
      // - headerText (String):  Change default text for the tile configuration header.  Default is "Tile Settings".
      // - handleValues (function):  Pass a function that can maniupulate the form values
      <SimpleForm handleValues={this.handleTitle} {...rest}>

        <p>{t('config.description')}</p>

        <Field fullWidth
          name="customTitle"
          label={t('config.form.fields.customTitle.label')}
          placeholder="Employee Directory"
          component={FieldWrapper} />
        <Field
          name="showTitle"
          label={t('config.form.fields.showTitle.label')}
          type="checkbox"
          fieldClass="wprev"
          component={FieldWrapper} />

        {
          // Other fields go here
        }

      </SimpleForm>
    );
  }
}

// Form validation - redux-form-validators can be used to streamline validation (https://www.npmjs.com/package/redux-form-validators#sync-validation)
const validate = (values) => {
  const errors = {};
  
  // Other validation rules go here

  return errors;
};

Config = reduxForm({
  form: 'config',
  initialValues,
  validate,
  enableReinitialize: true
})(Config);

Config = connect(
  state => {
    return ({
      saved: state.data.saved ? state.data.saved : false,
      configForm: state.form.config,
      ajaxLoading: state.ajaxLoading,
      initialValues: Object.keys(state.data).length !== 0 ? state.data : initialValues
    });
  },
  dispatch => {
    return {
      actions: bindActionCreators(redux.actions, dispatch)
    };
  }
)(Config)

export default withTranslation()(Config);

