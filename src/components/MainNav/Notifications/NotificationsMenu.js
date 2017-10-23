import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // eslint-disable-line import/no-extraneous-dependencies
import classNames from 'classnames'; // eslint-disable-line import/no-extraneous-dependencies

import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import List from '@folio/stripes-components/lib/List';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

import css from '@folio/stripes-components/lib/DropdownMenu/DropdownLayout.css';
import menuStyles from './NotificationMenu.css';

const propTypes = {
  notifications: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  lastOpen: PropTypes.object,
  dateFormat: PropTypes.string,  // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  dateFormat: 'YYYY-MM-DD',
};

const NotificationsMenu = (props) => {
  // static notification data...
  const notifications = [
    { id: '001', source: 'Calendar', date: '2018-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '002', source: 'Calendar', date: '2018-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '003', source: 'Calendar', date: '2018-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '004', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '005', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '006', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '007', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '008', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '009', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '010', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '011', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '012', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
    { id: '013', source: 'Calendar', date: '2013-02-04T22:44:30.652Z', description: 'New event added: Telfair Square Festival.', url: 'http://www.google.com' },
  ];

  // uncomment for wire-up to props
  // const { notifications, dateFormat, lastOpen } = props;

  function getNotificationClass(date) {
    return classNames(
      menuStyles.notification,
      { [`${menuStyles.new}`]: props.lastOpen ? moment(props.lastOpen).isBefore(date) : true },
    );
  }

  function notificationListFormatter(notification) {
    const formattedDate = moment(notification.date).format(props.dateFormat);

    return (
      <a key={notification.id} href={notification.url} style={{ display: 'block' }}>
        <Row className={getNotificationClass(notification.date)}>
          <Col xs>
            <div><strong>{notification.source} {formattedDate}</strong></div>
            <p>{notification.description}</p>
          </Col>
        </Row>
      </a>
    );
  }

  return (
    <div className={menuStyles.notificationMenu}>
      <div className={css.dropdownHeader}>Notifications</div>
      <div className={css.dropdownBody}>
        <div className={`${css.dropdownColumn} ${css.secondary}`} style={{ width: '30%' }}>
          <NavList>
            <NavListSection activeLink="all">
              <Button buttonStyle="link" fullWidth name="all" >All</Button>
              <Button buttonStyle="link" fullWidth name="users"> Users</Button>
              <Button buttonStyle="link" fullWidth name="circulation">Circulation</Button>
            </NavListSection>
          </NavList>
        </div>
        <div className={`${css.dropdownColumn} ${css.fill}`}>
          <List items={notifications} itemFormatter={notificationListFormatter} />
        </div>
      </div>
    </div>
  );
};

NotificationsMenu.propTypes = propTypes;
NotificationsMenu.defaultProps = defaultProps;

export default NotificationsMenu;