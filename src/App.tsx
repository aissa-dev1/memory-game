import Cells from "./components/cells";
import Container from "./components/container";
import NavBar from "./components/navBar";
import PlayerProgress from "./components/playerProgress";

const App = () => {
  return (
    <>
      <NavBar />
      <Container class="flex flex-col gap-4 mt-32 pb-4">
        <PlayerProgress />
        <Cells />
      </Container>
    </>
  );
};

export default App;
