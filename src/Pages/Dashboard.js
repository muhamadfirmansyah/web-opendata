import { useEffect, useState } from "react"
import Header from "../Components/Header"
import Map from "../Components/Map"

const Dashboard = () => {

    const [coordinate, setCoordinate] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( (position) => {
            setCoordinate(position.coords)
        })
    }, []);

    return (
        <>
            <Header />
            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900">Places Near Your Area</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">

                            <div className="container max-w-4xl mx-auto mb-4 font-bold">
                                <h4 className="text-2xl">
                                    { coordinate.latitude !== undefined ? (
                                        `[${coordinate.latitude}, ${coordinate.longitude}]`
                                    ) : (
                                        "No Access"
                                    ) }
                                </h4>
                            </div>

                            <div className="container mx-auto rounded-lg shadow p-4 max-w-4xl bg-white">
                                <Map />
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