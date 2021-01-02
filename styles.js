import myTheme from "../src/Assets/Theme/Theme";
const { color } = myTheme;

const style = {
    sideMenuHeight: {
        overflowX: 'inherit',
        overflowY: 'inherit',
    },
    paddingOnSideBar: {
        padding: "70px 0px",
        overflow: 'auto',
        overflowX: 'inherit',
        // overflowY: 'scroll',
    },

    page: {
        height: "100vh",
        overflow: "auto"
    },
    cursorPointer: {
        cursor: "pointer"
    },
    // highlightedIcon: {
    //     borderBottom: `8px solid ${color.Orange}`
    // },
    loginPageSiderBackGroundColor: {
        backgroundColor: `${color.Dark}`
    },
    loginPageLogoDivSize: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    loginPageLogoWidth: {
        width: "200px"
    },
    loginPageFormRowSize: {
        height: "100%",
    },
    loginPageFormColumnSize: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    login: {
        backgroundImage: {
            height: 'inherit', width: 'inherit'
        },
        helpButton: {
            display: "flex", justifyContent: "flex-end", padding: "30px 60px"
        }
    },
    whiteBackGround: {
        backgroundColor: "#fff"
    },
    loginPageFormButton: {
        border: "none",
        marginLeft: -22,
        height: "fit-content"

    },
    homeScreen: {
        background: {
            backgroundColor: `${color.Dark}`, minHeight: "100vh", height: "100%"
        },
        homeScreenHeader: {
            position: 'fixed',
            width: "100%",
            zIndex: 1,
            marginBottom: 60,
            backgroundColor: "#fff",
            padding: 0,
            height: 60,
            display: "flex",
            justifyContent: "space-between",
        },
        homeScreenContent: {
            backgroundColor: `${color.Dark}`,
            marginTop: 60,
            // height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        homeScreenContentDropdown: {
            backgroundColor: "#fff",
            border: "1px solid grey",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        homeScreenContentDiv: {
            // height: "calc(100%-80px)",
            maxWidth: 1100,
            // border: "1px solid red",
            // width: "80",
            // border: "1px solid yellow",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
        },
        homeScreenContentDivDropdown: {
            maxWidth: 700,
            border: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
        },
        homeScreenCard: {
            width: 240,
            height: 185,
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            padding: "10px",
            margin: "30px 45px",
            textAlign: "center"
        },
        homeScreenCardDropdown: {

            width: 100,
            height: 128,
            border: "none",
            textAlign: "center",
            cursor: "pointer"
            // display:"flex"

        },
        homeScreenCardDivider: {
            padding: 0, margin: 0, marginTop: "22px", backgroundColor: color.Orange
        },
        homeScreenCardDividerMainDiv: {
            display: "flex", justifyContent: "center"
        }
        ,
        homeScreenCardTitle: {
            fontWeight: "normal", padding: 10, color: `${color.Orange}`
        },
        homeScreenCardDividerDiv: {
            width: "60%",
        }
    },

    header: {
        backgroundColor: "#fff",
        padding: 0,
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        zIndex: 999,
        container: {
            height: 60,
            position: 'static', // fixed and static both work same
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
        },
        logo: {
            height: "100%",
            width: 220,
            background: `${color.Dark}`,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            MozBoxShadow: "4px 4px 8px -3px #777",
            WebkitBoxShadow: "4px 4px 8px -3px #777",
            boxShadow: "4px 4px 8px -3px #777",
        },
        emailsLogo: {
            height: "100%",
            width: 260,
            background: `${color.Dark}`,
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 999,
            // MozBoxShadow: "4px 4px 8px -3px #777",
            // WebkitBoxShadow: "4px 4px 8px -3px #777",
            // boxShadow: "4px 4px 8px -3px #777",
        },
        mainWithNotfications: {
            height: "100%",
            width: 500,
            // marginRight: 60,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        },
        main: {
            height: "100%",
            width: 300,
            // marginRight: 60,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        },
        mainForGeneralUser: {
            height: "100%",
            width: 300,
            paddingRight: 15,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        }
    },
    noMargin: {
        margin: 0,
    },
    noPadding: {
        padding: 0
    },

    blackColor: {
        color: "#000",
        background: 'inherit'
    },
    sideMenuSpan: {
        marginLeft: 15,
        fontSize: 15,
        backgroundColor: "inherit",
        color: '#626366'
    },

    helpSideMenuSpan: {
        marginLeft: 15,
        fontSize: 15,
        backgroundColor: "inherit",
        color: color.Blue
    },

    collapsedSideMenuIcon: {
        backgroundColor: `${color.Orange}`,
        position: "fixed",
        // top: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 65,
        zIndex: 2,
        cursor: "pointer"
    },
    sideMenuIcon: {
        backgroundColor: `${color.Orange}`,
        position: "fixed",
        top: 60,
        display: "flex",
        // justifyContent: "flex-end",
        alignItems: "center",
        width: 260,
        height: 65,
        zIndex: 1000,
        cursor: "pointer",
    },
    emailsSideMenuIcon: {
        position: "fixed",
        top: 60,
        backgroundColor: `${color.Orange}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "260px",
        height: 65,
        zIndex: 2
    },
    emailsCollapsedSideMenuIcon: {
        backgroundColor: `${color.Orange}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "inherit",
        height: 65,
        zIndex: 2
    },
    sideMenu: {
        borderRight: "0px solid rgba(0, 0, 0, 0.1)",
        height: "87%",
        display: "flex",
        flexDirection: "column",
        marginTop: 65,
        paddingBottom: 70,
        backgroundColor: "inherit"
    },
    collapsedSideMenu: {
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        height: "87%",
        paddingTop: 65,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 70,
        backgroundColor: "inherit"
    },
    pageHeader: {
        backgroundColor: `${color.Black10}`,
        height: "100%",
        display: "flex",
        alignItems: "center",
        MozBoxShadow: "2px 2px 5px -3px #777",
        WebkitBoxShadow: "`2px 2px 5px -3px #777",
        boxShadow: "2px 2px 5px -3px #777",
        border: "1px solid red",
    },
    pageHeaderDiv: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 20,
        border: "1px solid green",

    },
    pageHeaderDivContent: {
        display: "flex",
        alignItems: "center",
    },
    pageHeaderTitle: {
        // fontWeight: "normal",
        margin: "0 0 0px 20px",
        color: `${color.Blue}`,
        padding: 0,
        fontSize: 25
    },
    headerTextTitle: {
        // fontWeight: "normal",
        marginRight: 310,
        marginTop: 10,
        color: `${color.Blue}`,
        padding: 0,
        fontSize: 28
    },
    primaryButton: {
        backgroundColor: `${color.Orange}`,
        color: `#fff`,
        height: 36
    },
    secondaryButton: {
        backgroundColor: "#d5d9df",
        color: `${color.Black75}`,
        height: 36,
        marginLeft: 10,
    },
    // dataTableBorder: {
    //     border: `2px solid ${color.Black40}`
    // },
    footer: {
        container: {
            backgroundColor: "black",
            padding: "10px 0"
        },
        text: {
            color: `${color.Black40}`,
            fontSize: 12

        }
    },
    paddingLeft: {
        paddingLeft: 10
    },
    pageHeaderHelpText: {
        // fontWeight: "normal",
        margin: "0 0 0px 20px",
        color: `${color.Blue}`,
        padding: 0,
        fontWeight: 600,
        fontSize: 14

    },

    pageHeaderSideBarContent: {
        // fontWeight: "normal",
        // margin: "0 0 6px 15px",
        color: "#fff",
        padding: 0,
        fontWeight: 500,
        fontSize: 35,
        paddingLeft: 20,
        paddingBottom: 6
    },
    collapsedHelpSideMenuIcon: {
        backgroundColor: `${color.Orange}`,
        position: "fixed",
        top: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 65,
        zIndex: 2,
        cursor: "pointer",


    },
    helpSideMenuIcon: {
        backgroundColor: `${color.Orange}`,
        position: "fixed",
        top: 60,
        display: "flex",
        // justifyContent: "space-around",
        alignItems: "center",
        width: 260,
        height: 65,
        zIndex: 2,
        cursor: "pointer"
    },
    helpText: {
        color: `${color.Blue}`
    },
    helpTitle: {
        color: `${color.Blue}`
    },
    helpHeadingTitle: {
        color: `${color.Orange}`,
        alignSelf: 'center',
        marginBottom: 0,
        marginLeft: 20
    },
    padding10: {
        padding: 10
    },
    formItemBetweenGap: {
        marginTop: -20
    },
    allTrasferStyle: {
        width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"
    },
    transfer: {
        transferListStyle: {
            width: 220,
            height: 300,
            border: '2px solid #d9d9d9'
        },
        transferResetBtn: {
            float: 'right'
        }
    },
    tabs: {
        tabBar: {
            width: '100%', position: 'fixed', zIndex: 10, height: 40,
        }
    },
    setting: {
        drawerTitles: {
            color: `${color.Blue}`, padding: "20px 0 5px 1px", fontSize: 24, marginLeft: 10
        },
        drawerMain: {
            display: "flex", alignItems: "center", justifyContent: "space-between"
        },
        drawerIcons: {
            width: 35
        },
        drawerIconTitleWrapper: {
            display: "flex", alignItems: "center"
        },
        configuration: {
            generalScreen: {
                inputNumberWidth: {
                    width: "12vw"
                },
                inputNumberUnitText: {
                    marginLeft: 8
                }
            },
            historyDomain: {
                maicDiv: { display: "flex", alignItems: "center" }
            }
        },
        controlCenter: {
            activeProduct: {
                contentDiv: {
                    display: "flex", flexDirection: "row", justifyContent: 'space-around'
                },
                card: {
                    width: "35%", display: 'flex', flexDirection: 'row',
                },
                statisticValueFont: {
                    fontSize: 18
                },
                cardWidth: {
                    width: "35%"
                },
                uploadFileCard: {
                    width: 500, height: 300
                },
                uploadFileDiv: {
                    display: "flex", padding: 100, justifyContent: 'space-around'
                },
                buttons: {
                    width: "auto", marginRight: 30, backgroundColor: '#F05A28', color: '#E6E7E8'
                },
                Disablebutton: {
                    width: "auto", marginRight: 30
                }
            },
            configuration: {
                contentMainDiv: {
                    display: "flex", flexDirection: "row", justifyContent: 'flex-start'
                },
                borderLeft: {
                    borderLeft: '1px solid #e8e8e8'
                },
                marginBottom: {
                    marginBottom: '30px'
                }

            },
            status: {
                cardTitleRow: {
                    display: "flex", flexDirection: "row"
                },
                cardContentDiv: {
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: "0px 20px"
                },
                textFont11: {
                    fontSize: 11
                },
                textFont24: {
                    fontSize: 24
                },
                textFont28: {
                    fontSize: 28
                },
                dividerMainDiv: {
                    display: "flex", justifyContent: "center"
                }
            }

        },
        notification: {
            smtp: {
                title: {
                    color: "#7d8bb3", marginBottom: -20
                }
            }
        },
        policies: {
            archivalPolicy: {
                noteMainDiv: {
                    display: 'flex', flexDirection: "column"
                },
                includeExcludeDiv: {
                    display: "flex", marginLeft: "16.7%", marginTop: -34
                },
                note: {
                    display: "flex", marginLeft: "16.7%"
                },
                inputEmailId: {
                    width: "80vh"
                }

            }
        }


    },
    borderRadiusNone: {
        border: '2px solid #d9d9d9',
        borderRadius: '0px !important'
    },
    transferResetBtn: {
        float: 'right'
    },
    marginPadding0: {
        margin: 0,
        padding: 0
    },
    borderNone: {
        border: 'none'
    },
    marginTop10: {
        marginTop: 10
    },
    marginTop15: {
        marginTop: 15
    },
    paddingTop10: {
        paddingTop: 10
    },
    marginBottom0: {
        marginBottom: 0
    },
    table: {
        ColumnSearchInput: { width: 165, marginBottom: 8, display: 'block' }
    },
    height40: {
        height: 40
    },
    heightInherit: {
        height: "inherit"
    },
    controlCenter: {
        scheduler: {
            schedulerDiv: {
                display: "flex", justifyContent: "space-between", flexDirection: "row", width: "200px"
            }
        },
        statistic: {
            contentMainDiv: {
                display: "flex", flexDirection: "row", justifyContent: 'space-around'
            },
            borderLeft: {
                borderLeft: '1px solid #e8e8e8'
            },
            marginBottom: {
                marginBottom: '30px'
            }

        },
        tasklog: {
            inputTopPadding: {
                paddingTop: 2
            }
        },

    },
    drawerButtons: {
        display: "flex", flexDirection: 'row', justifyContent: "center", padding: "20px"
    },
    labelDropdownStyle: {
        marginBottom: '2px',
        fontWeight: 'bold',
        color: "#fff",
        width: "fit-content",
        padding: "2px 4px",
        borderRadius: 3
    },
    greaterThanSignButton: {
        width: 'auto',
        float: 'left',
        marginLeft: 5,
        fontSize: 12,
        cursor: "pointer",
        color: "blue"
    }


}

export default style;