import Header from "./components/header/index.jsx";
import ImageUploader from "./components/image-uploader/index.jsx";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col bg-stone-50 text-[#636363]">
      <Header>
        <h1>Add Image / Icon</h1>
      </Header>
      <main className="mx-auto flex w-screen max-w-xl flex-col">
        <ImageUploader />
      </main>
    </div>
  );
}

export default App;
