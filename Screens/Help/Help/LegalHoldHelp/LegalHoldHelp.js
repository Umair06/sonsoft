import React from "react";
// import styles from "../../../../styles"
// import whatsNewIcon from "../../../../Assets/icons/SV_ICONS/WhatsNew_Blue.png"
// import myArchived1 from "../../../../Assets/images/myArchived1.PNG";
// import myArchived2 from "../../../../Assets/images/myArchived2.PNG";
import legalhold1 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds1.jpg";
import legalhold2 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds2.jpg";
import legalhold3 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds3.jpg";
import legalhold4 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds4.jpg";
import legalhold5 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds5.jpg";
import legalhold6 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds6.jpg";
import legalhold7 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds7.jpg";
import legalhold8 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds8.jpg";
import legalhold9 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds9.jpg";
import legalhold10 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds10.jpg";
import legalhold11 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds11.jpg";
import legalhold12 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds12.jpg";
import legalhold13 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds13.jpg";
import legalhold14 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds14.jpg";
import legalhold15 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds15.jpg";
import legalhold16 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds16.jpg";
import legalhold17 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds17.jpg";
import legalhold18 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds18.jpg";
import legalhold19 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds19.jpg";
import legalhold20 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds20.jpg";
import legalhold21 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds21.jpg";
import legalhold22 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds22.jpg";
import legalhold23 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds23.jpg";
import legalhold24 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds24.jpg";
import legalhold25 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds25.jpg";
import legalhold26 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds26.jpg";
import legalhold27 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds27.jpg";
import legalhold28 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds28.jpg";
import legalhold29 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds29.jpg";
import legalhold30 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds30.jpg";
import legalhold31 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds31.jpg";
import legalhold32 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds32.jpg";
import legalhold33 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds33.jpg";
import legalhold34 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds34.jpg";
import legalhold35 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds35.jpg";
import legalhold36 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds36.jpg";
import legalhold37 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds37.jpg";
import legalhold38 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds38.jpg";
import legalhold39 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds39.jpg";
import legalhold40 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds40.jpg";
import legalhold41 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds41.jpg";
import legalhold42 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds42.jpg";
import legalhold43 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds43.jpg";
import legalhold44 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds44.jpg";
import legalhold45 from "../../../../Assets/ScreenShots/LegalHolds/LegalHolds45.jpg";
import { Typography } from "antd";

const { Title, Text } = Typography;

function LegalHold() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 40,
          paddingTop: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Title
          style={{ color: `#F05A28`, fontSize: 50, padding: "15px 0 0 0px" }}
        >
          {"Legal Holds"}
        </Title>
        <div className="legal-hold-paragraph">
          <Text>
            The SonaVault data archive retains documents according to the
            configured retention policies. Once a document’s retention has
            expired, the document will be queued to be purged according to the
            configured purge policy. A legal hold suspends a document’s standard
            retention policy so that that document cannot be purged.
          </Text>
          <br></br>
          <Text>
            Legal holds are placed on documents for several reasons including
            technical holds, internal investigations, corporate litigation,
            subpoenas, FOIA requests, Public Records Requests (PRR), etc.
            Documents can be placed on legal hold either from the{" "}
            <strong>Search Archive</strong> module or from the{" "}
            <strong>Legal Holds</strong> module. Once on hold, documents can be
            reviewed, released from hold, or exported, as needed.
          </Text>
          <br></br>
          <Text>
            When a legal hold is no longer in effect, it can be released. A
            document’s retention policy will remain suspended until it has been
            released from all legal holds. At which time the document will
            revert to its standard retention policy. If the retention period,
            for a given document, expired during the time that that document was
            on legal hold, the document will be queued to be purged according to
            the purge policy.
          </Text>

          <br></br>
          <br></br>
        </div>
        <Text>To access Legal Holds Page</Text>
        <ul>
          <li>
            Select <strong>Legal Holds</strong> from Sona Vault Page
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold1}
              style={{ height: "286px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            The page is categorized as <strong>All, Active,</strong> and
            Released legal holds.<strong> All</strong> displays a complete list
            of both <strong>Active</strong> and <strong>Released</strong> legal
            holds.
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold2}
              style={{ height: "286px", width: "651px" }}
            ></img>
            <br></br>
            <br></br>
          </li>
        </ul>
        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          Active Legal Holds
        </Title>
        <Text>
          Selecting <strong>Legal Holds</strong> from the SonaVault homepage
          automatically navigates you to the <strong>Active</strong> legal holds
          tab. As your site may or may not have existing legal holds, we will
          start by creating a new legal hold.
          <br></br>
          <br></br>
        </Text>
        <img alt='' src={legalhold3} style={{ height: "286px", width: "651px" }}></img>
        <br></br>
        <br></br>

        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          Create New Legal Hold
        </Title>
        <Text>
          <strong>To create a New Legal Hold</strong>
        </Text>
        <ol>
          <li>
            <Text>
              Select the{" "}
              <span>
                <img alt=''
                  src={legalhold4}
                  style={{
                    height: "48px",
                    width: "55px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              located at the top right corner of the page.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold5}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
          </li>
          <li>
            <Text>
              This opens the <strong>Create Legal Hold</strong> side-drawer.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold6}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
          </li>
          <li>
            <Text>
              In the <strong>Enter Legal Hold Name</strong> box, enter the legal
              hold name. This is often Plaintiff v. Defendant, a product name,
              topic, or some other highly recognizable name. Example:
              Distributor v. Consumer
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold7}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
          </li>
          <li>
            <Text>
              In the <strong>Enter Legal Hold</strong> Description box, enter a
              brief description of the legal hold.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold8}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
          </li>
          <li>
            <Text>
              Select the <strong>Submit</strong> button.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold9}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
          </li>
          <li>
            <Text>
              You should see your newly created legal hold in the list of{" "}
              <strong>Active</strong> legal holds.
            </Text>
          </li>
          <br></br>
          <br></br>
          <img alt=''
            src={legalhold10}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
        </ol>
        <Text>
          <strong>To place documents on Legal Hold</strong>
        </Text>
        <ol>
          <li>
            Select the legal hold that you just created, by selecting the bar.
          </li>
          <br></br>
          <br></br>
          <img alt=''
            src={legalhold11}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
          <li>
            <Text>
              The legal hold has two tabs, <strong>On Hold</strong> and{" "}
              <strong>Search Archive</strong>. <strong>On Hold</strong> shows a
              list of the documents that have already been placed on this legal
              hold. <strong>Search Archive</strong> allows you to search the
              SonaVault data archive and place files on this legal hold. Since
              you have not yet placed any documents on hold, the{" "}
              <strong>On Hold</strong> tab will be empty.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold12}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>Select Search Archive.</Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold13}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              A search field appears on the left pane of the page. In the{" "}
              <strong>Search</strong> field, enter the possible keyword that
              could be present in the documents being searched.
            </Text>
            <br></br>
            <Text>
              <strong>Note:</strong> You can narrow down the search by entering
              the period on which the document was received or sent, if the
              search is based on dates.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold14}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>

            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the <strong>Search</strong> button given below the search
              field. A list of documents with the keyword appears.{" "}
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold15}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              From the list of documents that appear, select the documents that
              you need to place on this legal hold by selecting the checkboxes.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold16}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
            <Text>
              <strong>Note:</strong> To choose all the documents in a page,
              select <strong>All Checkboxes</strong>.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold17}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              To place the selected documents on the legal hold, select the
              Apply Legal Hold icon{" "}
              <span>
                <img alt=''
                  src={legalhold18}
                  style={{
                    height: "48px",
                    width: "55px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              located at top right corner of the page.
            </Text>
            <br></br>
            <img alt=''
              src={legalhold19}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              This opens an <strong>Apply Legal Hold</strong> side-drawer.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold20}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the <strong>Submit</strong> button.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold21}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              You have now successfully placed 20 documents on the legal hold.{" "}
            </Text>
          </li>
        </ol>
        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          To Access Documents with Active Legal Holds
        </Title>
        <ol>
          <li>
            <Text>
              Navigate to Legal Holds homepage. Ensure that{" "}
              <strong>Active</strong> tab is selected. The tab displays a list
              of active legal holds.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold22}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the legal hold on which you placed the document by
              selecting the bar.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold23}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              This navigates you to the list of documents on hold. On the left
              pane, you can access legal hold case information. This includes
              the status of the legal hold, name of the plaintiff and defendant,
              case description, and the date on which the hold is created. The
              document displays the email type, sender and recipient addresses,
              and a snippet of the message.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold24}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>Select the bar that contains the document.</Text>
          </li>
          <br></br>
          <br></br>
          <img alt=''
            src={legalhold25}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
          <br></br>
          <br></br>
          <li>
            <Text>
              This automatically navigates you to the <strong>Message</strong>{" "}
              side-drawer. Here you can access the complete document, along with
              headers including sender and recipient addresses, subject line,
              date and time received, and carbon copy.{" "}
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold26}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the <strong>Metadata</strong> bar and you can access
              specific information about the archived email including company
              name, content type, date, and sender and recipient addresses.
            </Text>{" "}
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold27}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
        </ol>
        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          Forward and Download the Document on Hold
        </Title>
        <Text>
          Once you access the document on hold, you have an option to forward or
          download it.
        </Text>
        <Text>
          <strong>To Forward the Document </strong>
        </Text>
        <ol>
          <li>
            <Text>
              Select the Forward icon{" "}
              <span>
                <img alt=''
                  src={legalhold28}
                  style={{
                    height: "48px",
                    width: "55px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              located at the right side of the message bar.
            </Text>{" "}
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold29}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              A <strong>Forward</strong> side-drawer appears. In the{" "}
              <strong>Enter Email Address</strong> field, enter the sender’s
              email address.
            </Text>
          </li>
          <br></br>
          <br></br>
          <img alt=''
            src={legalhold30}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
          <br></br>
          <br></br>
          <li>
            <Text>
              Select the <strong>Submit</strong> button.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold31}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
        </ol>
        <Text>
          <strong>To Download a Document</strong>
        </Text>
        <ol>
          <li>
            <Text>
              Select the Download icon{" "}
              <span>
                <img alt=''
                  src={legalhold32}
                  style={{
                    height: "48px",
                    width: "55px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              located at top of the message bar.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold33}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              A <strong>Download</strong> side-drawer appears. Select the{" "}
              <strong>Submit</strong> button.
            </Text>{" "}
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold34}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
        </ol>
        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          Export Documents on Hold
        </Title>
        <Text>
          You can export documents on hold and save them as PDF, HTML or other
          email types.
          <br></br>
          <br></br>
        </Text>
        <Text>
          <strong>To Export Documents</strong>
        </Text>
        <ol>
          <li>
            <Text>
              Select the document to be exported by selecting the checkmark.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold35}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the Export icon{" "}
              <span>
                <img alt=''
                  src={legalhold36}
                  style={{
                    height: "48px",
                    width: "55px",
                    marginBottom: "30px"
                  }}
                ></img>
              </span>{" "}
              located at right corner of the page.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold37}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              A <strong>Create Exports</strong> side-drawer appears. Select{" "}
              <strong>Export Type</strong> from the{" "}
              <strong>Select Exports</strong> drop-down menu. The options
              include HTML, PDF, PST, and MSG.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold38}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              In the <strong>Enter Task Name</strong> field, enter your email
              address. Check the <strong>Required Password button</strong> and
              enter your password in the <strong>Password</strong> field.
              <br></br>
              <br></br>
            </Text>
          </li>
          <li>
            <Text>
              Select the <strong>Submit</strong> button.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold39}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>The document is successfully exported.</li>
        </ol>
        <Title style={{ color: `#446BA8`, fontSize: "25px" }}>
          Release Legal Hold
        </Title>
        <Text>
          When a legal hold is no longer in effect, it can be released.
          <br></br>
          <br></br>
        </Text>
        <Text>
          <strong>To Release a Legal Hold</strong>
        </Text>

        <ol>
          <li>
            <Text>
              Navigate to Legal Holds homepage. Ensure that{" "}
              <strong>Active</strong> tab is selected. Select the legal hold
              that needs to be released by selecting the checkbox.
            </Text>
          </li>

          <br></br>
          <br></br>
          <img alt=''
            src={legalhold40}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
          <br></br>
          <br></br>
          <li>
            Select the Release icon{" "}
            <span>
              <img alt=''
                src={legalhold41}
                style={{
                  height: "48px",
                  width: "55px",
                  marginBottom: "30px"
                }}
              ></img>
            </span>{" "}
            located at the top right corner of the page.
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold42}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              This opens a <strong>Release Legal Hold</strong> side-drawer.
            </Text>
            <br></br>
            <br></br>
            <img alt=''
              src={legalhold43}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              Select the <strong>Submit</strong> button.
            </Text>

            <br></br>
            <br></br>
            <img alt=''
              src={legalhold44}
              style={{
                height: "286px",
                width: "651px"
              }}
            ></img>
            <br></br>
            <br></br>
          </li>
          <li>
            <Text>
              To access the released legal hold, select the{" "}
              <strong>Released</strong> section of the page where you can access
              a list of released legal holds.
            </Text>
          </li>

          <br></br>
          <br></br>
          <img alt=''
            src={legalhold45}
            style={{
              height: "286px",
              width: "651px"
            }}
          ></img>
          <br></br>
          <br></br>
        </ol>
      </div>
    </div>
  );
}

export default LegalHold;
