import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (!this.state.errorInfo) {
      return <span className="error-boundary">{this.props.children}</span>;
    }

    return (
      <div>
        <h2>Holy macaroni Batman!</h2>
        <p>{this.state.error.toString()}</p>

        <details style={{ whiteSpace: "pre-wrap" }}>
          <summary>Component Stack</summary>
          <pre>{this.state.errorInfo.componentStack}</pre>
        </details>
      </div>
    );
  }
}

export default ErrorBoundary;
