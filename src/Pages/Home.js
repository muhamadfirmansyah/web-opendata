import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from '../Components/Map'
import { useAuthState } from "../Context";

const Home = () => {

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
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Replace with your content */}
                <div className="px-4 py-6 sm:px-0">

                    <div className="container max-w-4xl mx-auto mb-4 font-bold flex justify-between">
                        <h4 className="text-2xl">
                            {coordinate.coords !== undefined ? (
                                `[${coordinate.coords.latitude}, ${coordinate.coords.longitude}]`
                            ) : (
                                "No Access"
                            )}
                        </h4>
                        { useAuthState().token !== "" && (
                            <Link to="/dashboard" className="px-3 py-2 bg-purple-800 text-white rounded-lg shadow hover:bg-purple-900 font-normal">Dashboard</Link>
                        ) }
                    </div>

                    <div className="container mx-auto rounded-lg shadow p-4 max-w-4xl bg-white">
                        {isLoading ? (
                            <div>
                                Loading ...
                            </div>
                        ) : (
                            <>
                                {coordinate.coords !== undefined ? (
                                    <Map coordinate={coordinate} />
                                ) : (
                                    <div>
                                        <p>Turn on your location setting to access the map.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
                {/* /End replace */}
            </div>
        </main>
    )
}

export default Home