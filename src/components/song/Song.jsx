import AudioController from "../../utils/AudioController";
import s from "./Song.module.scss";
import Scene from "../../webgl/Scene";

const Song = ({ data }) => {
    const pickSong = () => {
        AudioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_xl);
    }

    return (
        <div 
            className={s.song}
            onClick={pickSong}>
            <img src={data.album.cover_small} alt="" />
            <p className={s.title}>{data.title}</p>
        </div>
    )
}

export default Song;