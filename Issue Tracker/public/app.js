class IssueFilter extends React.Component {
  render() {
    return React.createElement("div", null, "This is a placeholder for the issue filter.");
  }

}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  const issue = props.issue;
  return React.createElement("tr", null, React.createElement("td", null, issue.id), React.createElement("td", null, issue.status), React.createElement("td", null, issue.owner), React.createElement("td", null, issue.created.toDateString()), React.createElement("td", null, issue.effort), React.createElement("td", null, issue.due ? issue.due.toDateString() : ' '), React.createElement("td", null, issue.title));
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue => React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "ID"), React.createElement("th", null, "Status"), React.createElement("th", null, "Owner"), React.createElement("th", null, "Created"), React.createElement("th", null, "Effort"), React.createElement("th", null, "Due Date"), React.createElement("th", null, "Title"))), React.createElement("tbody", null, issueRows));
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New'
    };
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), React.createElement("button", null, "Add"));
  }

}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList 
      {
        id title status owner
        created effort due
      }
      }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    this.setState({
      issues: result.data.issueList
    });
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "Issue Tracker"), React.createElement(IssueFilter, null), React.createElement("hr", null), React.createElement(IssueTable, {
      issues: this.state.issues
    }), React.createElement("hr", null), React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

}

const element = React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));