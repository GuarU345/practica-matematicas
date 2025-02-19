import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
    return (
        <>
            <div className="grid place-content-center">
                <Navbar />
                <section>
                    {children}
                </section>
            </div>
        </>
    )
}