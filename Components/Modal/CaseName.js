import React, { Component } from 'react';
import { Drawer, Typography, Icon } from 'antd';
import style from '../../styles';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import Theme from '../../Assets/Theme/Theme';

const { Title } = Typography;
const { color } = Theme;

class RecipentsDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { caseNameDrawer, caseName, close } = this.props;
    return (
      <Drawer
        style={{ marginTop: '162px', overflow: 'auto', zIndex: 999 }}
        bodyStyle={{ height: 'calc(100vh - 162px)', overflowY: 'auto' }}
        maskStyle={{ backgroundColor: 'transparent' }}
        width={400}
        onClose={() => close()}
        closable={false}
        visible={caseNameDrawer}>
        <div
          style={{
            padding: '0px 10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div style={{ ...style.setting.drawerMain }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                type='lock'
                style={{ fontSize: 35, cursor: 'pointer', color: '#446ba8' }}
              />
              <Title
                style={{
                  color: color.Blue,
                  paddingBottom: 10,
                  padding: '15px 0 0 18px',
                  fontSize: 24
                }}
                level={2}>
                {'Case Name'}
              </Title>
            </div>
            <div
              onClick={() => close()}
              style={{ paddingTop: 10, cursor: 'pointer' }}>
              <img
                src={Clear_Gray}
                title='Close'
                alt=''
                onClick={() => this.props.close()}
                width={28}
                height={28}
              />
            </div>
          </div>
          <div style={{ width: 350, backgroundColor: '#fff' }}>
            {caseName &&
              caseName.length > 0 &&
              caseName.map((caseName, ind) => (
                <p key={ind} style={{ margin: '10px 0px' }}>{caseName}</p>
              ))}
          </div>
        </div>
      </Drawer>
    );
  }
}

export default RecipentsDrawer;
