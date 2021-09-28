import BuggyCounter from "./BuggyCounter";
import ErrorBoundary from "./ErrorBoundary";
import "./style.css";

const App = () => {
  return (
    <main>
      <section>
        <h1>No error boundary</h1>
        <BuggyCounter />
        <BuggyCounter />
      </section>

      <section>
        <h1>Shared error boundary</h1>
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
      </section>

      <section>
        <h1>Individual error boundary</h1>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>

        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default App;
