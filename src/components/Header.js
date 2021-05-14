import { useEffect, useState } from "react";

function Header(props) {
  const { tasks } = props;
  return (
    <header>
      <h1>Orbitodolist</h1>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <OverviewBox tasks={tasks} />
        <CatFactBox />
      </div>
    </header>
  );
}

function OverviewBox(props) {
  // This is passed all the way down from App
  const { tasks } = props;

  const [name, setName] = useState("Loading name...");

  // We do not need to use useState here, because we do not need to keep
  // a state of the task list length. This is purely a simple calculation
  // done on the passed prop.
  const taskListLength = tasks.filter((task) => !task.isComplete).length;

  // This effect runs on component mount, so that it will fetch data from
  // localStorage when it is loaded.
  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    // The ?? operator is called the nullish-coalescing operator
    // It sets the LHS of the operator, i.e. savedName, if LHS is not null
    // It sets the RHS of the operator, i.e. "John Doe", if LHS is null
    setName(savedName ?? "John Doe");
  }, []);

  return (
    <div className="HeaderBox">
      <h2>Overview</h2>
      <p>
        Welcome back,{" "}
        <strong
          role="button"
          onClick={() => {
            const newName = prompt("What is your name?", name);
            setName(newName);
            window.localStorage.setItem("name", newName);
          }}
        >
          {name || "<set a name>"}
        </strong>
        !
      </p>
      <p>
        You have{" "}
        <strong>
          {taskListLength} task{taskListLength === 1 ? "" : "s"}
        </strong>{" "}
        that {taskListLength === 1 ? "is" : "are"} not complete.
      </p>
    </div>
  );
}

function CatFactBox() {
  const [catFact, setCatFact] = useState("Loading cat fact...");

  // useEffect first argument: the effect that you want to run
  // useEffect second argument: the dependency array, i.e. the
  // values it is watching for any changes

  // In this case, the dependency array is empty (i.e. it is watching nothing)
  // so this effect will only run when the page has mounted (finished loading)
  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => setCatFact(data.fact))
      .catch((error) =>
        setCatFact(`Unable to retrieve cat fact. Error: ${error}`)
      );
  }, []);

  return (
    <div className="HeaderBox">
      <h2>Cat Fact of the Day</h2>
      <p>{catFact}</p>
    </div>
  );
}

export default Header;
