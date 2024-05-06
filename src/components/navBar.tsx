import Container from "./container";

const NavBar = () => {
  return (
    <nav class="fixed top-0 left-0 w-full flex flex-col justify-center h-28 shadow-sm bg-page shadow-slate-700 bg-opacity-25 backdrop-blur-lg backdrop-filter z-10">
      <Container class="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <h3 class="text-lg font-bold">Memory Game</h3>
        <p class="text-slate-500 text-sm font-semibold">Aissa Bedr</p>
      </Container>
    </nav>
  );
};

export default NavBar;
