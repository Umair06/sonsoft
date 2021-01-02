import React, { Component } from 'react';
import HelpTemplate from "../../../Container/HelpTemplate/HelpTemplate"
import WhatsNewScreen from "../What'sNew/WhatsNew/WhatsNew";
import { defineMessages } from 'react-intl';
import { message } from 'antd';

const messages = defineMessages({
    'Home': {
        id: "WhatsNew_Template.Home",
        defaultMessage: "Home",
    },
    'Whats New': {
        id: "WhatsNew_Template.WhatsNew",
        defaultMessage: "What's New"
    },
    'Resolved Issues': {
        id: "WhatsNew_Template.ResolvedIssues",
        defaultMessage: "Resolved Issues"
    },
    'Known Issues': {
        id: "WhatsNew_Template.KnownIssues",
        defaultMessage: "Known Issues"
    },
    'Limitation': {
        id: "WhatsNew_Template.Limitation",
        defaultMessage: "Limitation"
    },
})

class WhatsNew extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        message.destroy()
    }

    render() {
        const { formatMessage } = this.props;

        const routes = [
            {
                path: '/homescreen',
                exact: true,
                breadCrums: formatMessage(messages["Home"]),
                redirect: '/homescreen',
            },
            {
                path: '/whatsnew',
                exact: true,
                breadCrums: formatMessage(messages["Whats New"]),
                redirect: '/whatsnew/whatsnew'
            },

            {
                path: '/whatsnew/whatsnew',
                breadCrums: formatMessage(messages["Whats New"]),
                iconName: "WhatsNew_Blue",
                redirect: '/whatsnew/whatsnew',
                main: () => <WhatsNewScreen formatMessage={this.props.formatMessage} />
            },
            {
                path: '/whatsnew/resolvedissues',
                breadCrums: formatMessage(messages["Resolved Issues"]),
                iconName: "ResolvedIssues_Blue",
                redirect: '/whatsnew/resolvedissues',
                main: () => <WhatsNewScreen formatMessage={this.props.formatMessage} />

            },
            {
                path: '/whatsnew/knownissues',
                breadCrums: formatMessage(messages["Known Issues"]),
                iconName: "KnownIssues_Blue",
                redirect: '/whatsnew/knownissues',
                main: () => <WhatsNewScreen formatMessage={this.props.formatMessage} />

            },
            {
                path: '/whatsnew/limitation',
                breadCrums: formatMessage(messages["Limitation"]),
                iconName: "Limitations_Blue",
                redirect: '/whatsnew/limitation',
                main: () => <WhatsNewScreen formatMessage={this.props.formatMessage} />

            },
            // {
            //     path: '/whatsnew',
            //     breadCrums: "What's New",
            //     iconName:"WhatsNew_Blue"
            // }
        ];

        return (
            <div>
                <HelpTemplate imageFlag={true} formatMessage={formatMessage} historyProp={this.props.history} whatsNewScreen routes={routes} />
            </div>
        )
    }
};


export default WhatsNew;
