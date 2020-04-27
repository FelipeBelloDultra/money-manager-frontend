import React from 'react';
import PropTypes from 'prop-types';

import TopBar from './components/TopBar';
import './styles.css';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="main-content">
      <TopBar />
      <div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
