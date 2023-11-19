import Canvas from "./components/canvas/Canvas";
import Search from "./components/search/Search";
import Song from "./components/song/Song";
import s from "./styles/App.module.scss";
import useCustomStore from "./customStore";
import Picker from "./components/picker/Picker";

const App = () => {
  const songs = useCustomStore((state) => state.songs);
  return (
    <>
      <div className={s.songs}>
        {songs.map((song, key) => {
          return <Song key={key} data={song} />
        })}
      </div>
      <Canvas />
      <Picker></Picker>
      <Search />
      
    </>
  );
}

export default App;
