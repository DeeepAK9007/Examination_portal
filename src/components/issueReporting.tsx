import AddIssue from "./addIssueReporting";
import IssueTab from "./issueTab";
import NavBar from "./navbar";

function IssueReporting() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddIssue />
        <IssueTab />
      </div>
    </div>
  );
}

export default IssueReporting;
