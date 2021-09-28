import { DependencyProvider, useDependency } from "./DependencyProvider";

const ComponentA = () => {
  const { setShouldLog, logService } = useDependency();

  logService("Rendering Component A");

  return (
    <button onClick={() => setShouldLog((prevShouldLog) => !prevShouldLog)}>
      Switch logging
    </button>
  );
};

const ComponentB = () => {
  const { shouldLog, logService } = useDependency();

  logService("Rendering Component B");

  return <p>Logging: {shouldLog ? "enabled" : "disabled"}</p>;
};

const App = () => {
  return (
    <DependencyProvider>
      <ComponentA />
      <ComponentB />
    </DependencyProvider>
  );
};

export default App;
