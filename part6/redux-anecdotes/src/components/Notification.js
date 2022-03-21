import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  if (notification.timeout) {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    };
    return <div style={style}>{notification.text}</div>;
  }

  return null;
};

const mapStateToProps = ({ notification }) => {
  return {
    notification,
  };
};

const ConnectedNotification = connect(mapStateToProps, null)(Notification);

export default ConnectedNotification;
