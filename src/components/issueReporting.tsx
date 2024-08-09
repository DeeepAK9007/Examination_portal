import AddIssue from "./addIssueReporting";
import IssueTab from "./issueTab";
import NavBar from "./navbar";

function IssueReporting() {
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        <AddIssue /> {/* Component for adding a new issue */}
        <IssueTab />
        {/* Component for displaying the list of issues */}
      </div>
    </div>
  );
}

export default IssueReporting;
