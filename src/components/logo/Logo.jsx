import s from "./Logo.module.scss";
import logo from "../../img/logo.svg";

const Logo = () => {
    return (
        <div 
            className={s.logo}
        >
            <img src={logo} alt="" />
            <h1>Discover.</h1>
        </div>
    )
}

export default Logo;