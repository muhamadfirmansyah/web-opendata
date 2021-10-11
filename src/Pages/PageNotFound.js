import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <section className="relative bg-white py-20 2xl:py-40 overflow-hidden h-screen">
            <div className="relative container px-4 mx-auto">
                <div className="max-w-3xl mx-auto">
                    <div className="max-w-xl">
                        <h2 className="mt-24 mb-12 text-5xl font-bold font-heading text-purple-800">Sorry, we can&apos;t find that page or something has gone wrong...</h2>
                        <Link className="inline-block px-12 py-4 text-lg bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full transition duration-200" to="/">Start again</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound