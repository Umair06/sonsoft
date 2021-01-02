import React, { Component } from 'react'
import { Drawer, Typography, } from "antd";
import Theme from "../../Assets/Theme/Theme";
import SonaVaultLogo from "../../Assets/icons/SV_ICONS/Sonasoft-logo-Segoe-Semi-bold-GRAY-3b3b3b-2019-05-24_v2.png"
import style from "../../styles"
import { defineMessages } from 'react-intl';
import Clear_Gray from '../../Assets/icons/SV_ICONS/Clear_Gray.png';
import About_Blue from '../../Assets/icons/SV_ICONS/About_Blue.png';
import {version} from "../../APIConfig/Config"

const messages = defineMessages({
    'About': {
        id: "AboutUsDrawer.About",
        defaultMessage: "About",
    },
    'Product Support': {
        id: "AboutUsDrawer.ProductSupport",
        defaultMessage: "Product Support"
    },
    'Hours': {
        id: "AboutUsDrawer.Hours",
        defaultMessage: "Hours"
    },
    'PST': {
        id: "AboutUsDrawer.PST",
        defaultMessage: "PST"
    },
    'SonaVault Support': {
        id: "AboutUsDrawer.SonaVaultSupport",
        defaultMessage: "SonaVault Support"
    },
    'Headquarters': {
        id: "AboutUsDrawer.Headquarters",
        defaultMessage: "Headquarters"
    },
    'Main': {
        id: "AboutUsDrawer.Main",
        defaultMessage: "Main"
    },
    'Support': {
        id: "AboutUsDrawer.Support",
        defaultMessage: "Support",
    },
    'Fax': {
        id: "AboutUsDrawer.Fax",
        defaultMessage: "Fax",
    },
    'Software': {
        id: "AboutUsDrawer.Software",
        defaultMessage: "Software",
    },
    'Version': {
        id: "AboutUsDrawer.Version",
        defaultMessage: "Version",
    },
    'Built': {
        id: "AboutUsDrawer.Built",
        defaultMessage: "Built",
    },
})

// const { Option } = Select;
const { color } = Theme;
const { Title, Text } = Typography;

const data = {
    sonasoftTiming: "9AM-6PM ",
    productNo: "408.708.4010",
    HeadquartersAddress: ["1735 N.First Street, Suite 110", "San Jose, CA 95112", "USA"],
    main: "408.708.4000",
    support: '408.708.4010',
    fax: '408.946.5800',
    version: String(version),
    built: 'Fall 2019 09.31.2019',
    copyright: '2019 Sonasoft. All rights reserved.'
}


class AboutUsDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { signIn, formatMessage } = this.props;
        return (
            <Drawer
                style={{ marginTop: !signIn ? "61px" : "0", padding: "0px 24px", overflowY: "auto" }}
                bodyStyle={{ height: !signIn ? 'calc(100vh - 61px)' : "100%", overflowY: "auto" }}
                maskStyle={{ backgroundColor: "transparent" }}
                width={400}
                onClose={() => this.props.close()}
                closable={false}
                visible={this.props.aboutUsDrawer}
            >
                <div style={{ padding: "0px 20px", display: "flex", flexDirection: "column", }}>
                    <div style={{...style.setting.drawerMain}}>
                        <div style={{...style.setting.drawerIconTitleWrapper}}>
                           <img src={About_Blue} alt="" title="About" height={35} width={35}/>
                            <Title style={{ color: `${color.Blue}`, padding: "15px 0 0 18px", fontSize: 30 }}>{formatMessage(messages["About"])}</Title>
                        </div>
                        <div onClick={() => this.props.close()} style={{ padding: 8, cursor: "pointer" }}>
                            <img src={Clear_Gray} title="Close" alt="" onClick={() => this.props.close()} width={28} height={28} />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: 20 }}>
                        {/* <Title style={{ display: "flex", justifyContent: 'center', color: `${color.Dark}`, margin: 0 }} level={1} >Sonasoft</Title> */}
                        <center> <img style={{}} alt="" src={SonaVaultLogo} height='60' width="250"></img></center>
                        <a style={{ alignSelf: 'center', marginTop: -10, fontSize: 18 }} target="_blank"
                        rel="noopener noreferrer" href="https://www.sonasoft.com">www.sonasoft.com</a>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", paddingTop: 15, }}>
                        <Text style={{ color: `${color.Black75}`, fontSize: 22, fontWeight: 500 }}>{formatMessage(messages["Product Support"])}</Text>
                        <Text style={{ color: `${color.Black40}`, fontSize: 18, fontWeight: 600 }}>{formatMessage(messages["Hours"])}: {data.sonasoftTiming} {formatMessage(messages["PST"])}</Text>
                        <Text style={{ color: `${color.Blue}`, fontSize: 16, fontWeight: 600 }}>{data.productNo}</Text>
                    </div>
                    <div style={{ marginTop: 20, display: "flex", justifyContent: 'center', height: 'auto', paddingTop: 10, }}>
                        <div style={{ background: `${color.Orange}`, color: `#fff`, padding: '3px 25px', fontSize: 22, width: 'auto' }} >{formatMessage(messages["SonaVault Support"])}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column", paddingTop: 25, }}>
                            <Text style={{ color: `${color.Black75}`, fontSize: 16, fontWeight: 500 }}>{formatMessage(messages["Headquarters"])}</Text>
                            {data.HeadquartersAddress.map((element, ind) => {
                                return <Text key={ind} style={{ color: `${color.Black40}`, fontSize: 12, fontWeight: 600 }}>{element}</Text>
                            })}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", paddingTop: 15 }}>
                            <Text style={{ color: `${color.Black40}`, fontSize: 14, fontWeight: 600 }}>{formatMessage(messages["Main"])}: <span style={{ color: `${color.Blue}` }} > {data.main}</span></Text>
                            <Text style={{ color: `${color.Black40}`, fontSize: 14, fontWeight: 600 }}>{formatMessage(messages["Support"])}: <span style={{ color: `${color.Blue}` }} >{data.support}</span> </Text>
                            <Text style={{ color: `${color.Black40}`, fontSize: 14, fontWeight: 600 }}>{formatMessage(messages["Fax"])}: <span style={{ color: `${color.Blue}` }} >{data.fax}</span></Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", paddingTop: 15, }}>
                            <Text style={{ color: `${color.Black75}`, fontSize: 16, fontWeight: 500 }}>{formatMessage(messages["Software"])}</Text>
                            <Text style={{ color: `${color.Black40}`, fontSize: 12, fontWeight: 600 }}>{formatMessage(messages["Version"])}:{data.version}</Text>
                            <Text style={{ color: `${color.Black40}`, fontSize: 12, fontWeight: 600 }}>{formatMessage(messages["Built"])}:{data.built}</Text>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", paddingTop: 15, }}>
                            <Text style={{ color: `${color.Black40}`, fontSize: 10, fontWeight: 500 }}>&#9400; {data.copyright}</Text>
                        </div>
                    </div>
                </div>
            </Drawer>
        )
    }
};

export default AboutUsDrawer;
