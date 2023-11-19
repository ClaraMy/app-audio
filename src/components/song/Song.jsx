import AudioController from "../../utils/AudioController";
import s from "./Song.module.scss";
import Scene from "../../webgl/Scene";

const Song = ({ data }) => {
    const pickSong = () => {
        AudioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_xl);
    }

    console.log(data);

    return (
        <div 
            className={s.song}
            onClick={pickSong}>
            <img className={s.img} src={data.album.cover_medium} alt="" />
            <div className={s.info}>
                <p className={s.title}>{data.title}</p>
                <p className={s.artist}>{data.artist.name}</p>
            </div>
        </div>
    )
}

export default Song;