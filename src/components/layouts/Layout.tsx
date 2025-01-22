import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <hr
                style={{
                    margin: 0
                }}></hr>
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout