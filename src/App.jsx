import Header from "./components/header/index.jsx";
import ImageUploader from "./components/image-uploader/index.jsx";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-stone-50 text-[#636363]">
      <Header>
        <h1>Add Image / Icon</h1>
      </Header>
      <main className="mx-auto w-full max-w-md">
        <ImageUploader />
      </main>
    </div>
  );
}

export default App;
