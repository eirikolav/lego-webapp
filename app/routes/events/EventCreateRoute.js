import { connect } from 'react-redux';
import { compose } from 'redux';
import { formValueSelector } from 'redux-form';
import { createEvent } from 'app/actions/EventActions';
import { uploadFile } from 'app/actions/FileActions';
import EventEditor from './components/EventEditor';
import moment from 'moment';
import { LoginPage } from 'app/components/LoginForm';
import { transformEvent } from './utils';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';

const time = (hours, minutes) =>
  moment()
    .startOf('day')
    .add({ hours, minutes })
    .toISOString();

const mapStateToProps = (state, props) => {
  const actionGrant = state.events.actionGrant;
  const valueSelector = formValueSelector('eventEditor');
  return {
    initialValues: {
      title: '',
      startTime: time(17, 15),
      endTime: time(20),
      description: '',
      text: '',
      eventType: '',
      company: null,
      location: 'TBA',
      isPriced: false,
      useStripe: true,
      priceMember: 0,
      mergeTime: time(12),
      useCaptcha: true,
      feedbackDescription: 'Melding til arrangører',
      pools: []
    },
    actionGrant,
    event: {
      isPriced: valueSelector(state, 'isPriced'),
      eventType: valueSelector(state, 'eventType')
    },
    pools: valueSelector(state, 'pools')
  };
};

const mapDispatchToProps = {
  handleSubmitCallback: event => createEvent(transformEvent(event)),
  uploadFile
};

export default compose(
  replaceUnlessLoggedIn(LoginPage),
  connect(mapStateToProps, mapDispatchToProps)
)(EventEditor);
