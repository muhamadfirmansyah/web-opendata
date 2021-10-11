import { useEffect, useState } from "react"
import Header from "../Components/Header"
import Map from "../Components/Map"

const Dashboard = () => {

    const [coordinate, setCoordinate] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCurrent = () => {
            navigator.geolocation.getCurrentPosition( (position) => {
                setCoordinate(position)
                setIsLoading(false)
            }, (err) => {
                console.log(err)
                setIsLoading(false)
            })
        }

        getCurrent()

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">

                            <div className="container max-w-4xl mx-auto mb-4 font-bold">
                                <h4 className="text-2xl">
                                    { coordinate.coords !== undefined ? (
                                        `[${coordinate.coords.latitude}, ${coordinate.coords.longitude}]`
                                    ) : (
                                        "No Access"
                                    ) }
                                </h4>
                            </div>

                            <div className="container mx-auto rounded-lg shadow p-4 max-w-4xl bg-white">
                                { isLoading ? (
                                    <div>
                                        Loading ...
                                    </div>
                                ) : (
                                    <>
                                        { coordinate.coords !== undefined ? (
                                            <Map coordinate={coordinate} />
                                        ) : (
                                            <div>
                                                <p>Turn on your location setting to access the map.</p>
                                            </div>
                                        ) }
                                    </>
                                ) }
                            </div>

                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dashboard