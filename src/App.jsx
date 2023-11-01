import { useContext } from "react";
import Comments from "./components/Comments";
import DeleteModal from "./components/DeleteModal";
import { AppContex } from "./context/AppContext";

function App() {
  const { openModal, modalPlacement, modalSize } = useContext(AppContex);

  return (
    <>
      <DeleteModal
        openModal={openModal}
        modalPlacement={modalPlacement}
        modalSize={modalSize}
      />
      <div className="justify-center w-[100%] min-h-screen flex items-start">
        <Comments />
      </div>
    </>
  );
}

export default App;
