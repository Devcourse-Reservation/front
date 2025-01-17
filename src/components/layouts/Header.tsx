import Logo from "../images/Logo"

const Header = () => {
    return (
        <div className="header-container"
            style={{
                marginLeft: '15vh'
            }}
        >
            <header>
                <Logo />
            </header>
        </div>
    )
}
export default Header