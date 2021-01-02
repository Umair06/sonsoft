import React, { Component } from 'react';
import DataTable from "../../../Components/DataTable/DataTable";
import { Typography, message } from "antd";
import { connect } from "react-redux";
import { updateDataTableActions } from "../../../Redux/Actions/pageHeader/pageHeader";
import { fetchExports, postDownloadData, getDownloadLink } from "../../../Redux/Actions/ExportAction/ExportAction";
// import HistoricDomainSideDrawer from "../../../../Components/Modal/HistoricDomain"
import { defineMessages } from 'react-intl';
import moment from "moment";
import DataTableHeader from "../../../Components/DataTable/Component/DataTableHeader"
import * as ApiInfo from "../../../APIConfig/ApiParameters"


const { Text } = Typography;

const messages = defineMessages({
    'Name': {
        id: "tasks.name",
        defaultMessage: "Name",
    },
    'Scheduled Date': {
        id: "tasks.scheduledDate",
        defaultMessage: "Scheduled Date"
    },
    'Status': {
        id: "tasks.status",
        defaultMessage: "Status"
    },
    'Enable': {
        id: "tasks.enable",
        defaultMessage: "Enable"
    },
    'Available Till': {
        id: "tasks.availableTill",
        defaultMessage: "Available Till"
    },
    'Download Link': {
        id: "tasks.downloadLink",
        defaultMessage: "Download Link"
    },
})


class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        message.destroy()
    }
    b64toBlob = (b64Data, contentType, sliceSize, filename) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        if (base64regex.test(b64Data)) {
            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters && byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters && byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays && byteArray.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', filename + '.' + contentType);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a)
            return blob;
        }
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: "30%",
            render: name => <span style={{ wordBreak: "break-all" }} >{name}</span>,
        },
        {
            title: 'Available Until',
            dataIndex: 'availableTill',
            width: "30%",
            render: availableTill => {
                let date = availableTill ? (moment(new Date(availableTill)).format('DD-MM-YYYY hh:mm A') === "Invalid date" ? availableTill : moment(new Date(availableTill)).format('DD-MM-YYYY hh:mm A')) : ""
                return (
                    <Text style={{ wordBreak: "break-all" }}>{date}</Text>
                )
            }
        },
        {
            title: 'Download Link',
            // dataIndex:'downloadLinks',
            width: "40%",
            render: text => text.downloadLinks && Array.isArray(text.downloadLinks) && text.downloadLinks.map((downloadLink, index) => {
                return (
                    // <div key={index}>
                    <a key={index} title={downloadLink} id="download"
                        href={ApiInfo.APIPORT + `/api/v2/downloads/${text.keyID}/${downloadLink}`}
                        style={{ border: "none", wordBreak: "break-all" }}
                    >
                        {downloadLink}
                    </a>
                    // </div>
                )
            })
        }
    ];


    componentDidMount() {
        this.props.fetchExports()
        this.props.updateDataTableActions({ refresh: true, onRefresh: () => this.fetchExports() })
    }

    componentWillUnmount() {
        this.props.updateDataTableActions({ refresh: false })
    }

    fetchExports() {
        this.props.getDownloadLink()
        this.props.fetchExports()
    }
    openColumConfigDrawer = () => {
        this.setState({
            columnConfig: true
        })
    };

    closeColumConfigDrawer = () => {
        this.setState({
            columnConfig: false
        })
    };
    currentPaginationSize = (page) => {
        this.setState({ currentPage: page })
    }
    currentPageSize = (value) => {
        this.setState({ pageSize: value })
    }

    render() {
        const { columnConfig, currentPage, pageSize } = this.state
        const { formatMessage } = this.props;
        const messagesKeys = Object.keys(messages);
        const messagesValues = Object.values(messages);
        this.columns.forEach((c) => {
            messagesKeys.forEach((mK, index) => {
                if (c.key === mK) {
                    c.title = formatMessage(messagesValues[index]);
                }
            })
        })

        return (
            <div>
                {/* {historicDomainSideDrawer && (<HistoricDomainSideDrawer close={ () => this.onClose("historicDomainSideDrawer")}/>)} */}
                <div >
                    <DataTableHeader openColumConfigDrawer={() => this.openColumConfigDrawer()} formatMessage={formatMessage} data={this.props.exportDownloadLink} currentPageSize={this.currentPageSize} />
                    <DataTable closeColumConfigDrawer={() => this.closeColumConfigDrawer()}
                        columnConfig={columnConfig} keyID="keyID" formatMessage={formatMessage} columns={this.columns} data={this.props.exportDownloadLink} coveredHeight={200} pageSize={pageSize || 20}
                        currentPage={currentPage}
                        currentPaginationSize={this.currentPaginationSize} />
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        exportDownloadLink: state.ExportReducer.exportDownloadLink
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateDataTableActions: actions => dispatch(updateDataTableActions(actions)),
        fetchExports: () => dispatch(fetchExports()),
        postDownloadData: (data, index) => dispatch(postDownloadData(data, index)),
        getDownloadLink: data => dispatch(getDownloadLink(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Task);


