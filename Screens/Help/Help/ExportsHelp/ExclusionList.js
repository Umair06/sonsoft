import React from 'react';
import {Typography } from 'antd';

const {Title} = Typography;

function ExclusionList() {
        return (
            <div style={{display:"flex",justifyContent:"center"}}>
                <Title style={{ color: `grey`, padding: "15px 0 0 0px", fontSize: 50 }}>{"Available in 7.1"}</Title>

            </div>
        )
    
}

export default ExclusionList;